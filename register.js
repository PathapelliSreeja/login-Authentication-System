const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

if (!registerForm || !message) {
    console.error("Registration form elements are missing.");
} else {
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    message.style.color = "red";
    message.textContent = "";

    // Empty field validation
    if (!username || !email || !password) {
        message.textContent = "Please fill in all fields.";
        return;
    }

    // Password validation
    if (password.length < 8) {
        message.textContent = "Password must be at least 8 characters.";
        return;
    }

    if (!/\d/.test(password)) {
        message.textContent = "Password must contain at least one number.";
        return;
    }

    // Duplicate username/email check
    if (userExists(username, email)) {
        message.textContent = "Username or email already exists.";
        return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Get existing users
    const users = getUsers();

    // Add new user
    users.push({
        username,
        email,
        password: hashedPassword
    });

    // Save to localStorage
    saveUsers(users);

    // Success message
    message.style.color = "green";
    message.textContent = "Registration successful! Redirecting...";

    // Redirect to login page
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
});
}