const userSection = document.getElementById("userSection");

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
            userSection.innerText = "Sign In";
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
    try {
        const listContainer = document.getElementById("recipeList");
        listContainer.innerHTML = ""; // Clear previous content

        const currentPath = window.location.pathname;
        const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/')); // Gets current directory

        recipes.forEach(recipe => {
            const card = document.createElement("div");
            card.className = "recipe-card";

            const imagePath = recipe.image_url
                ? `${currentDir}/images/recipeImages/${recipe.image_url}`
                : `${currentDir}/images/default.jpg`;

            card.innerHTML = `
                <a href="recipeInfo.html?id=${recipe.id}" class="recipe-card-link">
                    <img src="${imagePath}" alt="${recipe.recipe_name}">
                    <h3>${recipe.recipe_name}</h3>
                    <p>${recipe.description || ''}</p>
                </a>
            `;

            listContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error rendering recipe list:", error);
    }
}

// Handle search and display results
function handleSearch(query) {
    const filtered = allRecipes.filter(recipe =>
        recipe.recipe_name.toLowerCase().includes(query.toLowerCase())
    );

    // Update plain text search results list without affecting recipe cards
    const searchResultsContainer = document.getElementById("searchResultsList");
    searchResultsContainer.innerHTML = ""; // Clear previous search results

    if (!query.trim()) return; // Skip if the search query is empty

    if (filtered.length === 0) {
        searchResultsContainer.innerText = "No matching recipes.";
        return;
    }

    // Create a plain text list of matching recipes
    const list = document.createElement("ul");
    filtered.forEach(recipe => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = `recipeInfo.html?id=${recipe.id}`;
        link.innerText = recipe.recipe_name;
        item.appendChild(link);
        list.appendChild(item);
    });

    searchResultsContainer.appendChild(list);
}

// Listen to input event on search box
document.getElementById("searchBox").addEventListener("input", (e) => {
    handleSearch(e.target.value);  // Update only the search results list
});

async function initPage() {
    checkLoginStatus();
    await loadRecipeList(); // Wait for recipes to load
    renderRecipeList(allRecipes); // Render all recipes initially
}

initPage();
