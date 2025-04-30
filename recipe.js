const userSection = document.getElementById("userSection")

console.log("hi");

async function checkLoginStatus() {
    try {
        const response = await fetch("fetchUser.php"); // Fetch PHP session data
        const data = await response.json();
        console.log(data.isLoggedIn);
        if (data.isLoggedIn) {
            userSection.href = "logout.php";
            userSection.innerText = data.username;
        } else {
            userSection.href = "signIn.html";
            userSection.innerText = "Sign In"
        }

    } catch (error) {
        console.error("Error fetching session data:", error);
    }
}

function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

async function getRecipe(recipeId) {
    try {
        const response = await fetch("fetchRecipe.php?id=" + recipeId);
        const data = await response.json();

        const { recipe_name: recipeName, image_url: recipeImageURL, description : recipeDesc, instructions : recipeInst, prep_time : recipePrepT, cook_time : recipeCookT, servings : recipeServ} = data;

        const currentPath = window.location.pathname;
        const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/')); // Gets current directory

        document.getElementById("recipeName").innerText = recipeName;
        document.getElementById("recipeImage").src = currentDir + "/images/recipeImages/" + recipeImageURL;
        document.getElementById("desc").innerText = recipeDesc;
        document.getElementById("instructions").innerText = recipeInst;
        document.getElementById("prepTime").innerText = recipePrepT;
        document.getElementById("cookTime").innerText = recipeCookT;
        document.getElementById("servings").innerText = recipeServ;

    } catch (error) {
        console.error("Error fetching recipe data:", error);
    }
}

async function getRecipeIngredients(recipeId) {
    try {
        const response = await fetch("fetchRecipeIngredients.php?id=" + recipeId);
        const ingredients = await response.json();

        const listContainer = document.getElementById("ingredientList");
        listContainer.innerHTML = ""; // Clear previous content

        ingredients.forEach(item => {
            const link = document.createElement("a");
            link.innerText = `${item.quantity} ${item.ingredient}`;
            link.style.display = "block"; // new line for each
            listContainer.appendChild(link);
        });

    } catch (error) {
        console.error("Error loading recipe list:", error);
    }
}

checkLoginStatus();

window.addEventListener("DOMContentLoaded", () => {
    const recipeId = getQueryParam("id");
    if (recipeId != null) {
        getRecipe(recipeId);
        getRecipeIngredients(recipeId) 
    } else {
        console.warn("No recipe ID found in the URL");
    }
});

