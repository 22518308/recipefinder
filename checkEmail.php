<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "recipefinda_useraccounts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_GET['email'];

$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

// Check if email exists
if ($stmt->num_rows > 0) {
    echo "taken";
} else {
    echo "Email is available.";
}

$stmt->close();
$conn->close();

?>