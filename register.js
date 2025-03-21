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


document.getElementById("registerForm").addEventListener("submit", async function (event) {

    event.preventDefault();

    let email = document.getElementById("registerEmail").value;
    let username = document.getElementById("registerUsername").value;
    let password = document.getElementById("registerPassword").value;
    let confirmpassword = document.getElementById("registerPasswordConfirm").value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
        const response = await fetch("checkEmail.php?email=" + email);
        const data = await response.text();
        console.log(data);
        if (data == "taken") {
            document.getElementById("emailError").innerHTML = "Email is already in use"
            return;
        } else {
            document.getElementById("emailError").innerHTML = ""

         
        }
    } else {
        document.getElementById("emailError").innerHTML = "Please enter a valid email address"
        return;
    }

    if (username.length < 5) {
        document.getElementById("usernameError").innerHTML = "Username should be at least 5 characters long"
        return;
    } else if (username.length > 49) {
        document.getElementById("usernameError").innerHTML = "Username too long"
        return;
    } else {
        document.getElementById("usernameError").innerHTML = ""
    }

    if (password.length < 8) {
        document.getElementById("passwordError").innerHTML = "Password should be at least 8 characters long"
        return;
    } else if (password.length > 254) {
        document.getElementById("passwordError").innerHTML = "Password too long"
        return;
    } else {
        document.getElementById("passwordError").innerHTML = ""
    }

    if (password !== confirmpassword) {
        document.getElementById("passwordConfirmError").innerHTML = "Passwords do not match"
        return;
    } else {
        document.getElementById("passwordConfirmError").innerHTML = ""
    }

    this.submit();
});


checkLoginStatus();
