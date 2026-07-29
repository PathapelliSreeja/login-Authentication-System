// Check if user is logged in
const loggedInUser = getLoggedInUser();

// Redirect to login page if no user session exists
if (!loggedInUser) {
    alert("Please login first.");
    window.location.href = "index.html";
}

// Display welcome message
const welcome = document.getElementById("welcome");
welcome.textContent = `Welcome, ${loggedInUser.username}!`;

// Logout button
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
    // Clear session
    logout();

    alert("Logged out successfully!");

    // Redirect to login page
    window.location.href = "index.html";
});