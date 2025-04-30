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

if (!isset($_GET['id'])) {
    die(json_encode(["error" => "Missing recipe ID"]));
}

$recipe_id = intval($_GET['id']); // Always sanitize inputs

$sql = "
    SELECT 
        r.recipe_name,
        i.name AS ingredient_name,
        ri.quantity
    FROM recipe_ingredients ri
    JOIN recipes r ON ri.recipe_id = r.id
    JOIN ingredients i ON ri.ingredient_id = i.id
    WHERE ri.recipe_id = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $recipe_id);
$stmt->execute();
$result = $stmt->get_result();

$ingredients = [];

while ($row = $result->fetch_assoc()) {
    $ingredients[] = [
        "recipe_name" => $row["recipe_name"],
        "ingredient" => $row["ingredient_name"],
        "quantity" => $row["quantity"]
    ];
}

$stmt->close();
$conn->close();

header("Content-Type: application/json");
echo json_encode($ingredients);
?>