<?php
$apiKey = "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";

$input = json_decode(file_get_contents("php://input"), true);
$userMessage = $input["message"];

$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "Authorization: Bearer $apiKey"
]);

$body = json_encode([
  "model" => "gpt-3.5-turbo",
  "messages" => [
    ["role" => "system", "content" => "Eres un asistente veterinario amigable."],
    ["role" => "user", "content" => $userMessage]
  ]
]);

curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
$response = curl_exec($ch);
curl_close($ch);

header("Content-Type: application/json");
echo $response;
?>
