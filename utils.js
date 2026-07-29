// SHA-256 Password Hashing
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

// Get all registered users
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Check if username or email already exists
function userExists(username, email) {
    const users = getUsers();

    return users.some(user =>
        user.username.toLowerCase() === username.toLowerCase() ||
        user.email.toLowerCase() === email.toLowerCase()
    );
}

// Save logged-in user (session)
function setLoggedInUser(user) {
    localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
            username: user.username,
            email: user.email
        })
    );
}

// Get logged-in user
function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}

// Logout user
function logout() {
    localStorage.removeItem("loggedInUser");
}