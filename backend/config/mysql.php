<?php
$conn = new mysqli("localhost", "root", "", "user_profile");
if ($conn->connect_error) {
    die("DB Error");
}
