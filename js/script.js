document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".login-button");

    loginButton.addEventListener("click", function () {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        
        const emailError = document.getElementById("email-error");
        const passwordError = document.getElementById("password-error");

        emailError.textContent = "";
        passwordError.textContent = "";

        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = "Por favor, insira um endereço de e-mail válido.";
            isValid = false;
        }

        if (password === "" || password.length < 8) {
            passwordError.tValid = fextContent = "A senha deve ter pelo menos 8 caracteres.";
            isalse;
        } else if (!/^[A-Za-z0-9]+$/.test(password)) {
            passwordError.textContent = "A senha deve conter apenas letras e números.";
            isValid = false;
        }

        if (isValid) {
            const storedUser = JSON.parse(localStorage.getItem("user"));

            if (storedUser && storedUser.email === email && storedUser.password === password) {
                alert("Login bem-sucedido!");
                window.location.href = "home.html";
            } else {
                alert("Credenciais inválidas. Verifique seu e-mail e senha.");
            }
        }
    });
});
