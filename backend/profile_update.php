<?php
require 'config/mysql.php';
require 'config/redis.php';

header('Content-Type: application/json');

if (!isset($_POST['token'])) {
    echo json_encode(["status" => false, "message" => "Token missing"]);
    exit;
}

$email = $redis->get($_POST['token']);
if (!$email) {
    echo json_encode(["status" => false, "message" => "Invalid session"]);
    exit;
}

$stmt = $conn->prepare(
    "INSERT INTO profile (email, name, age, dob, contact)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        age = VALUES(age),
        dob = VALUES(dob),
        contact = VALUES(contact)"
);

$stmt->bind_param(
    "ssiss",
    $email,
    $_POST['name'],
    $_POST['age'],
    $_POST['dob'],
    $_POST['contact']
);

if ($stmt->execute()) {
    echo json_encode([
        "status" => true,
        "message" => "Profile updated successfully"
    ]);
} else {
    echo json_encode([
        "status" => false,
        "message" => "Database error"
    ]);
}

$stmt->close();
$conn->close();
