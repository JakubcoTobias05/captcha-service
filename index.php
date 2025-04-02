<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>Formulář s CAPTCHA</title>
  <style>
    /* Jednoduché styly formuláře */
    form { max-width: 500px; margin: 20px auto; }
    input, button { display: block; width: 100%; margin: 10px 0; padding: 10px; }
    button:disabled { background: #ccc; }
  </style>
</head>
<body>

  <form id="my-form" action="" method="POST">
    <input type="text" name="name" placeholder="Vaše jméno" required>
    <input type="email" name="email" placeholder="Váš email" required>

    <div data-captcha-widget 
         data-api-key="f918feaea1668ba3d760d9924e2d527f4bc65e221a08012f9fc13e5103ec672c" 
         data-lang="cs" 
         data-type="image">
    </div>

    <input type="hidden" name="captcha_token" id="captcha_token">

    <button id="submit-btn" type="submit" disabled>Odeslat formulář</button>
  </form>

  <script>
    window.addEventListener('captchaVerified', function(e) {
      document.getElementById('captcha_token').value = e.detail.token;
      document.getElementById('submit-btn').disabled = false;
    });
  </script>
</body>
</html>

<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/captcha-widget@1.0.7/dist/captcha-widget.umd.js"></script>