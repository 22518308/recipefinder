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
    try {

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
