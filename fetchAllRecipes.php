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

$sql = "SELECT id, recipe_name, image_url FROM recipes";

$result = $conn->query($sql);

$recipes = [];

while ($row = $result->fetch_assoc()) {
    $recipes[] = $row;
}

$conn->close();

header("Content-Type: application/json");

echo json_encode($recipes);

?>