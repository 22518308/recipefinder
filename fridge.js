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
        userSection.href = "signIn.html";
        userSection.innerText = "Sign In"
    }
}

let allIngredients = []; 
let selectedIngredients = [];

async function loadIngredientList() {
    try {
        const response = await fetch("fetchAllIngredients.php");
        allIngredients = await response.json();

    } catch (error) {
        console.error("Error loading ingredient list:", error);
        allIngredients = [
            { id: 1, name: "Flour" },
            { id: 2, name: "Sugar" },
            { id: 3, name: "Eggs" },
            { id: 1, name: "Flour" },
            { id: 2, name: "Sugar" },
            { id: 3, name: "Eggs" },
            { id: 1, name: "Flour" },
            { id: 2, name: "Sugar" },
            { id: 3, name: "Eggs" }
        ];
    }
}

async function renderIngredientList(ingredients) {
    try {
        const listContainer = document.getElementById("ingredientList");
        listContainer.innerHTML = "";

        ingredients.forEach(ingredient => {
            const label = document.createElement("label");
            label.style.display = "block"; // new line for each

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = ingredient.id;
            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    selectedIngredients.push(ingredient);
                } else {
                    selectedIngredients = selectedIngredients.filter(item => item.id !== ingredient.id);
                }
                console.log("Selected ingredients:", selectedIngredients);
            });

            label.appendChild(checkbox);
            label.append(" " + ingredient.name);
            listContainer.appendChild(label);
        });

    } catch (error) {
        console.error("Error rendering ingredient list:", error);
    }
}

async function renderRecipeList() {
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

function handleSearch(query) {
    const filtered = allIngredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(query.toLowerCase())
    );
    renderIngredientList(filtered);
}

document.getElementById("searchBox").addEventListener("input", (e) => {
    handleSearch(e.target.value);
});

document.getElementById("submitIngredients").addEventListener("click", () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedIds = Array.from(checkboxes).map(cb => cb.value);

    // Pass selected ingredient IDs to the next page via URL (as a comma-separated list)
    const queryString = new URLSearchParams({ ingredients: selectedIds.join(',') }).toString();
    window.location.href = `searchResults.html?${queryString}`;
});

async function initPage() {
    checkLoginStatus();
    await loadIngredientList();              // wait for ingredients to load
    renderIngredientList(allIngredients);    // now render them
}

initPage();
