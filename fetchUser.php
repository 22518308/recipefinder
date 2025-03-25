<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "recipefinda_useraccounts";

$response = [
    "isLoggedIn" => isset($_SESSION["username"]),
    "username" => $_SESSION["username"] ?? null
];

header("Content-Type: application/json");
echo json_encode($response);

?>
