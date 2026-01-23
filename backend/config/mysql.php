<?php
// $conn = new mysqli("localhost", "root", "", "user_profile");
// if ($conn->connect_error) {
//     die("DB Error");
// }

//$conn = new mysqli("20.193.254.221", "mysqluser", "mysqluser543", "hcl_userprofile");
$conn = new mysqli("20.193.254.221", "mysqluser", "mysqluser543", "hcl_userprofile", 3316);

if ($conn->connect_error) {
    die("DB Error");
}
