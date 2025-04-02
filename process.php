<?php
// Získání dat z formuláře
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
$captchaToken = $_POST['captchaToken'] ?? '';

if (empty($captchaToken)) {
    die("CAPTCHA nebyla ověřena. Zkuste to prosím znovu.");
}

// Volání backendového API pro ověření CAPTCHA
$apiUrl = "https://captcha-service-rjty.onrender.com/api/v1/captcha/verify";
$data = [
    "type" => "image",  // Podle typu, který používáte (text, image, audio, nocaptcha)
    "token" => $captchaToken,
    "answer" => "" // Pokud používáte typ, kde se odesílá odpověď, zde ji přidejte
];

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-api-key: f918feaea1668ba3d760d9924e2d527f4bc65e221a08012f9fc13e5103ec672c'
]);
$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);

if (isset($result['success']) && $result['success'] === true) {
    // CAPTCHA ověřena, pokračujte se zpracováním formuláře
    echo "CAPTCHA ověřena, uživatel se může přihlásit.";
    // Další logika zpracování přihlášení...
} else {
    // CAPTCHA selhala, informujte uživatele
    echo "CAPTCHA ověření selhalo. Zkuste to prosím znovu.";
}
?>
