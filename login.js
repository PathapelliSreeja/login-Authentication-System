const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const input = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    message.style.color = "red";
    message.textContent = "";

    // Empty field validation
    if (!input || !password) {
        message.textContent = "Please fill in all fields.";
        return;
    }

    // Get all users
    const users = getUsers();

    // Hash entered password
    const hashedPassword = await hashPassword(password);

    // Find matching user (username or email)
    const user = users.find(user =>
        (user.username.toLowerCase() === input.toLowerCase() ||
         user.email.toLowerCase() === input.toLowerCase()) &&
        user.password === hashedPassword
    );

    // Invalid credentials
    if (!user) {
        message.textContent = "Invalid username/email or password.";
        return;
    }

    // Save login session
    setLoggedInUser(user);

    // Success message
    message.style.color = "green";
    message.textContent = "Login successful! Redirecting...";

    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1000);
});