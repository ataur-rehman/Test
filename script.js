document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMessage");

  if (username === "user@example.com" && password === "Password123") {
    if (document.getElementById("rememberMe").checked) {
      localStorage.setItem("savedUsername", username);
      localStorage.setItem("savedPassword", password);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.clear();
    }
    sessionStorage.setItem("isAuthenticated", "true");
    window.location.href = "home.html";
  } else {
    errorMessage.textContent = "Invalid username or password.";
  }
});

document.getElementById("password").addEventListener("input", function (e) {
  const strengthMeter = document.getElementById("passwordStrength");
  const strengthText = document.getElementById("strengthText");
  const password = e.target.value;

  let strength = 0;
  if (password.match(/[a-z]/)) strength++;
  if (password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[^A-Za-z0-9]/)) strength++;

  strengthMeter.className = "strength-meter";
  strengthText.textContent = "";

  if (password.length >= 8) {
    if (strength === 1) {
      strengthMeter.classList.add("weak");
      strengthText.textContent = "Weak";
    } else if (strength === 2) {
      strengthMeter.classList.add("medium");
      strengthText.textContent = "Medium";
    } else if (strength >= 3) {
      strengthMeter.classList.add("strong");
      strengthText.textContent = "Strong";
    }
  }
});

window.addEventListener("load", () => {
  if (localStorage.getItem("rememberMe") === "true") {
    document.getElementById("username").value = localStorage.getItem("savedUsername") || "";
    document.getElementById("password").value = localStorage.getItem("savedPassword") || "";
    document.getElementById("rememberMe").checked = true;
  }
});