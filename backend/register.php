<?php
require 'config/mongo.php';

$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT);

$collection->insertOne([
    "email" => $email,
    "password" => $password
]);

echo "Registered Successfully";
