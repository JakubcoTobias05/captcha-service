import crypto from 'crypto';
import redisClient from '../utils/redisClient.js';
import logger from '../utils/logger.js';
import config from '../config.js';

class NoCaptcha {
  constructor() {
    this.CAPTCHA_TTL = config.captchaTTL;
    this.MIN_MOVEMENTS = config.noCaptcha?.minMouseMovements || 5;
    this.MIN_CLICKS = config.noCaptcha?.minClicks || 1;
    this.MIN_TIME = config.noCaptcha?.minInteractionTime || 500;
  }

  async generate() {
    try {
      const token = crypto.randomBytes(32).toString('hex');
      const challenge = {
        createdAt: Date.now(),
        secret: crypto.randomBytes(16).toString('hex') 
      };

      await redisClient.set(
        `captcha:nocaptcha:${token}`,
        JSON.stringify(challenge),
        { EX: this.CAPTCHA_TTL }
      );

      return {
        token,
        interactionConfig: {
          requiredMovements: this.MIN_MOVEMENTS,
          requiredClicks: this.MIN_CLICKS,
          requiredTime: this.MIN_TIME
        },
        instructions: 'Proveďte přirozenou interakci s prvkem'
      };
    } catch (error) {
      logger.error('NoCAPTCHA generation failed', { error: error.stack });
      throw new Error('CAPTCHA_GENERATION_FAILED');
    }
  }

  async verify(token, interactionData) {
    try {
      if (interactionData) {
        logger.debug("NoCAPTCHA - Přijatá interakční data:", JSON.stringify(interactionData, null, 2));
      } else {
        logger.debug("NoCAPTCHA - žádná interakční data přijata");
      }
      
      const storedData = await redisClient.get(`captcha:nocaptcha:${token}`);
      if (!storedData) {
        logger.warn('Neplatný nebo expirovaný token', { token });
        return false;
      }

      const { secret } = JSON.parse(storedData);
      const {
        mouseTrail = [],
        clickTimestamps = [],
        startTime,
        endTime
      } = interactionData;

      if (!this.#validateInput(mouseTrail, clickTimestamps, startTime, endTime)) {
        logger.debug('NoCAPTCHA - Validation input check failed');
        return false;
      }

      const verificationResult = this.#analyzeBehavior(
        mouseTrail,
        clickTimestamps,
        startTime,
        endTime,
        secret
      );

      await redisClient.del(`captcha:nocaptcha:${token}`);

      logger.info('NoCAPTCHA verification', {
        token,
        result: verificationResult ? 'valid' : 'invalid',
        interactionSummary: {
          totalMovement: mouseTrail.length,
          totalClicks: clickTimestamps.length,
          totalTime: endTime - startTime
        }
      });

      return verificationResult;
    } catch (error) {
      logger.error('NoCAPTCHA verification failed', { 
        token,
        error: error.stack 
      });
      return false;
    }
  }

  #validateInput(mouseTrail, clicks, startTime, endTime) {
    return (
      Array.isArray(mouseTrail) &&
      Array.isArray(clicks) &&
      typeof startTime === 'number' &&
      typeof endTime === 'number' &&
      endTime > startTime
    );
  }

  #analyzeBehavior(mouseTrail, clickTimestamps, startTime, endTime, secret) {
    const totalTime = endTime - startTime;
    if (totalTime < this.MIN_TIME) {
      logger.debug(`NoCAPTCHA - totalTime ${totalTime}ms < MIN_TIME ${this.MIN_TIME}ms`);
      return false;
    }


    const movementScore = this.#calculateMovementScore(mouseTrail);
    const clickScore = this.#calculateClickScore(clickTimestamps, startTime, endTime);

    const movementThreshold = 0.01;
    const clickThreshold = 0.01;

    const isHumanPattern = (
      movementScore > movementThreshold &&
      clickScore > clickThreshold
    );

    logger.debug('NoCAPTCHA - analyzeBehavior results:', {
      totalTime,
      movementScore,
      clickScore,
      movementThreshold,
      clickThreshold,
      isHumanPattern
    });

    return isHumanPattern;
  }

  #calculateMovementScore(mouseTrail) {
    if (mouseTrail.length < 3) return 0;

    let distance = 0;
    let directionChanges = 0;
    let lastDirection = null;

    for (let i = 1; i < mouseTrail.length; i++) {
      const dx = mouseTrail[i].x - mouseTrail[i-1].x;
      const dy = mouseTrail[i].y - mouseTrail[i-1].y;

      distance += Math.sqrt(dx * dx + dy * dy);

      const currentDirection = Math.atan2(dy, dx);
      if (lastDirection !== null) {
        const angleDiff = Math.abs(currentDirection - lastDirection);
        if (angleDiff > Math.PI / 4) directionChanges++;
      }
      lastDirection = currentDirection;
    }

    const rawScore = (directionChanges / 10) + (distance / 1000);
    const finalScore = Math.min(1, rawScore);

    logger.debug('NoCAPTCHA - movementScore calculation:', {
      distance,
      directionChanges,
      rawScore,
      finalScore
    });

    return finalScore;
  }

  #calculateClickScore(clickTimestamps, startTime, endTime) {
    const clickIntervals = [];
    for (let i = 1; i < clickTimestamps.length; i++) {
      clickIntervals.push(clickTimestamps[i] - clickTimestamps[i-1]);
    }

    const avgInterval = clickIntervals.length > 0
      ? clickIntervals.reduce((a, b) => a + b) / clickIntervals.length
      : 0;

    const irregularityScore = 1 - (Math.abs(avgInterval - 500) / 500);

    const baseScore = (clickTimestamps.length / this.MIN_CLICKS) * irregularityScore;
    const finalScore = Math.min(1, baseScore);

    logger.debug('NoCAPTCHA - clickScore calculation:', {
      clickTimestamps,
      avgInterval,
      irregularityScore,
      baseScore,
      finalScore
    });

    return finalScore;
  }
}

export default new NoCaptcha();
