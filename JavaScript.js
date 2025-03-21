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


checkLoginStatus();
