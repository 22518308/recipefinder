<?php
session_start();
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "recipefinda_recipes";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Use GET instead of POST
if (!isset($_GET['ingredients'])) {
    die(json_encode(["error" => "Missing ingredients parameter."]));
}

$ingredientIds = array_map('intval', explode(',', $_GET['ingredients']));
if (empty($ingredientIds)) {
    die(json_encode(["error" => "No valid ingredient IDs provided."]));
}

$placeholders = implode(',', array_fill(0, count($ingredientIds), '?'));

$sql = "
    SELECT 
        r.id,
        r.recipe_name,
        r.image_url,
        COUNT(ri.ingredient_id) AS matched_ingredients
    FROM recipes r
    JOIN recipe_ingredients ri ON r.id = ri.recipe_id
    WHERE ri.ingredient_id IN ($placeholders)
    GROUP BY r.id
    ORDER BY matched_ingredients DESC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param(str_repeat('i', count($ingredientIds)), ...$ingredientIds);
$stmt->execute();
$result = $stmt->get_result();

$recipes = [];
while ($row = $result->fetch_assoc()) {
    $recipes[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode($recipes);
?>
