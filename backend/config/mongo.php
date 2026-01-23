<?php
require '../vendor/autoload.php';

//$mongo = new MongoDB\Client("mongodb://localhost:27017");
// $db = $mongo->user_auth;
// $collection = $db->users;
$mongo = new MongoDB\Client("mongodb://mongouser:mongoadmin543@20.193.254.221:27007/hcl_auth?authSource=admin");
$db = $mongo->user_auth;
$collection = $db->users;
