<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "recipefinda_recipes";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$recipe_id = 1;

$response = [];

$sql = "SELECT recipe_name FROM recipes WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $recipe_id);
$stmt->execute();
$result = $stmt->get_result();

$response = $result->fetch_assoc();

$conn->close();

header("Content-Type: application/json");
echo json_encode($response);

?>