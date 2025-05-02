// JavaScript source code
// includeHeaderFooter.js
function loadHTML(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(err => console.error(`Error loading ${file}:`, err));
}

document.addEventListener("DOMContentLoaded", () => {
    loadHTML("header-placeholder", "header.html");
    loadHTML("footer-placeholder", "footer.html");
});