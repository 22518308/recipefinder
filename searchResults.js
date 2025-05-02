const userSection = document.getElementById("userSection");

async function checkLoginStatus() {
    try {
        const response = await fetch("fetchUser.php");
        const data = await response.json();
        if (data.isLoggedIn) {
            userSection.href = "logout.php";
            userSection.innerText = data.username;
        } else {
            userSection.href = "signIn.html";
            userSection.innerText = "Sign In";
        }
    } catch (error) {
        console.error("Error fetching session data:", error);
    }
}

function getSelectedIngredients() {
    const params = new URLSearchParams(window.location.search);
    const ingredients = params.get('ingredients');
    return ingredients ? ingredients.split(',').map(id => parseInt(id)) : [];
}

async function loadMatchingRecipes() {
    const selectedIngredients = getSelectedIngredients();

    if (selectedIngredients.length === 0) {
        console.error("No ingredients selected.");
        return;
    }

    try {
        const query = selectedIngredients.join(',');
        const response = await fetch(`fetchRecipeByIngredients.php?ingredients=${query}`);
        const recipes = await response.json();

        if (recipes.error) {
            console.error("Error from server:", recipes.error);
            return;
        }

        renderRecipeList(recipes);
    } catch (error) {
        console.error("Error fetching matching recipes:", error);
    }
}

function renderRecipeList(recipes) {
    const container = document.getElementById("recipeList");
    container.innerHTML = "";

    if (recipes.length === 0) {
        container.innerText = "No recipes found.";
        return;
    }

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        const title = document.createElement("a");
        title.href = `recipeInfo.html?id=${recipe.id}`;
        title.innerText = `${recipe.recipe_name} (${recipe.matched_ingredients} match${recipe.matched_ingredients > 1 ? 'es' : ''})`;

        card.appendChild(title);
        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
    loadMatchingRecipes();
});