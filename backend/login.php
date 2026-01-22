<?php
require 'config/mongo.php';
require 'config/redis.php';

$email = $_POST['email'];
$password = $_POST['password'];

$user = $collection->findOne(["email" => $email]);

if ($user && password_verify($password, $user['password'])) {
    $token = bin2hex(random_bytes(16));
    $redis->set($token, $email);
    echo json_encode(["status" => true, "message" => "login successful", "token" =>$token]);
   
} else {
    echo json_encode(["status" => false, "message" => "invalid username or password", "token" =>null]);
   
}
