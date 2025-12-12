// ================================
// Toggle Password Visibility
// ================================
function togglePassword() {
  let passwordField = document.getElementById("password");
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
}

// ================================
// Handle Login Form
// ================================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Save username & email (you can extend with password check later)
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);

    // Redirect to welcome page
    window.location.href = "welcome.html";
  });
}

// ================================
// Handle Signup Form
// ================================
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;

    // Save name & email
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);

    // Redirect to welcome page
    window.location.href = "welcome.html";
  });
}

// ================================
// Forgot Password
// ================================
function forgotPassword() {
  let email = prompt("Enter your registered email:");
  if (email) {
    alert("Password reset link sent to " + email);
  }
}