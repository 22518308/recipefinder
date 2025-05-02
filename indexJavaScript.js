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

let allRecipes = []; // global variable to hold all fetched recipes

async function loadRecipeList() {
    try {
        const response = await fetch("fetchAllRecipes.php");
        allRecipes = await response.json();

    } catch (error) {
        console.error("Error loading recipe list:", error);
        allRecipes = [
            { id: 1, recipe_name: "Spaghetti Bolognese" },
            { id: 2, recipe_name: "Chocolate Cake" },
            { id: 3, recipe_name: "Caesar Salad" }
        ];
    }
}

async function renderRecipeList(recipes) {
    const listContainer = document.getElementById("recipeList");
    listContainer.innerHTML = "";  // clear previous content

    if (recipes.length === 0) {
        listContainer.innerHTML = "<p>No matches found.</p>";
        return;
    }

    const currentPath = window.location.pathname;
    const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/')); // Gets current directory

    recipes.forEach(recipe => {
        // Create the card wrapper
        const card = document.createElement("div");
        card.className = "recipe-card";

        // Fill with your card markup
        card.innerHTML = `
            <a href="recipeInfo.html?id=${recipe.id}" class="recipe-card-link">
                <img src="${currentDir + "/images/recipeImages/" + recipe.image_url || 'images/default.jpg'}" alt="${recipe.recipe_name}">
                    <h3>${recipe.recipe_name}</h3>
                    <p>${recipe.description || ''}</p>
            </a>
            `;

        listContainer.appendChild(card);
    });
}
function handleSearch(query) {
    const filtered = allRecipes.filter(recipe =>
        recipe.recipe_name.toLowerCase().includes(query.toLowerCase())
    );
    renderRecipeList(filtered);
}

document.getElementById("searchBox").addEventListener("input", (e) => {
    handleSearch(e.target.value);
});

document.getElementById("searchBox").addEventListener("blur", () => {
    setTimeout(() => {
        document.getElementById("recipeList").innerHTML = "";
    }, 140); // Delay long enough for a click to register
});

checkLoginStatus();

loadRecipeList()
