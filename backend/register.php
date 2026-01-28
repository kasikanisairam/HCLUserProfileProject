<?php
require 'config/mongo.php';   // MongoDB connection
require 'config/mysql.php';  // MySQL connection ($conn)

$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT);

try {
    /* ---------- MongoDB Insert ---------- */
    $collection->insertOne([
        "email" => $email,
        "password" => $password,
        "created_at" => new MongoDB\BSON\UTCDateTime()
    ]);

    /* ---------- MySQL Insert (profile table) ---------- */
    $stmt = $conn->prepare("INSERT INTO profile (email,name,age,dob,contact) VALUES (?,?,?,?,?)");
    $stmt->bind_param("ssiss", $email,$_POST['name'],$_POST['age'],$_POST['dob'],$_POST['contact']);
    $stmt->execute();

    echo json_encode([
        "status" => true,
        "message" => "Registered Successfully"
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => false,
        "message" => "Registration failed"
    ]);
}
