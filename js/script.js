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
            passwordError.textContent = "A senha deve ter pelo menos 8 caracteres.";
            isValid = false;
        } else if (!/^[A-Za-z0-9]+$/.test(password)) {
            passwordError.textContent = "A senha deve conter apenas letras e números.";
            isValid = false;
        }

        if (isValid) {
            chamarLoginApi(email, password);
        }
    });

    async function chamarLoginApi(email, password) {
        try {
            const response = await fetch('https://projetoweb-api.vercel.app/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login bem-sucedido:", data);
                localStorage.setItem("user", JSON.stringify(data));
                alert("Login bem-sucedido!");
                window.location.href = "home.html";
            } else {
                const error = await response.json();
                alert(`Erro no login: ${error.message}`);
            }
        } catch (err) {
            console.error("Erro ao tentar se comunicar com a API:", err);
            alert("Erro ao tentar fazer login. Tente novamente mais tarde.");
        }
    }
});
