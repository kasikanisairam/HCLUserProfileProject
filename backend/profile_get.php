<?php
require 'config/mysql.php';
require 'config/redis.php';

header('Content-Type: application/json');

// Check token
if (!isset($_POST['token'])) {
    echo json_encode(["status" => false, "message" => "Token missing"]);
    exit;
}

$token = $_POST['token'];
$email = $redis->get($token);

// Validate session from Redis
if (!$email) {
    echo json_encode(["status" => false, "message" => "Invalid session"]);
    exit;
}

// Prepared statement (NO simple SQL)
$stmt = $conn->prepare(
    "SELECT name, age, dob, contact FROM profile WHERE email = ?"
);
$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
    echo json_encode([
        "status" => true,
        "data" => $data
    ]);
} else {
    echo json_encode([
        "status" => true,
        "data" => [
            "name" => "",
            "age" => "",
            "dob" => "",
            "contact" => ""
        ]
    ]);
}

$stmt->close();
$conn->close();
