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

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $hashed_password = $row['password'];

        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            echo "Login successful! <a href='index.html'>What now?</a>";
        } else {
            echo "Wrong! Moron.";
        }
    } else {
        echo "Couldn't find email jit";
    }
}

$conn->close();

?>