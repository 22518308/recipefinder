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



async function renderRecipeList(recipes) {
    try {
        const response = await fetch("fetchAllRecipes.php");
        recipes = await response.json();
        const listContainer = document.getElementById("recipeList");
        listContainer.innerHTML = ""; // Clear previous content

        recipes.forEach(recipe => {
            const link = document.createElement("a");
            link.href = `recipeInfo.html?id=${recipe.id}`;
            link.innerText = recipe.recipe_name;
            link.style.display = "block"; // new line for each

            listContainer.appendChild(link);
        });

    } catch (error) {
        console.error("Error rendering recipe list:", error);
    }
}

checkLoginStatus();

renderRecipeList()