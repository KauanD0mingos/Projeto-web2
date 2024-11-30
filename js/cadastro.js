document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.querySelector(".login-button");

    registerButton.addEventListener("click", function () {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const animeSelect = document.getElementById("linguages");

        const selectedanime = Array.from(animeSelect.selectedOptions).map(option => option.value);


        if (name === "" || email === "" || password.length < 8) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password,
            anime_preference: selectedanime
        };

        async function chamarApi() {
            try {
                console.log("Enviando dados para a API:", user);

                const response = await fetch('https://projetoweb-api.vercel.app/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Resposta da API:", data);
                    localStorage.setItem("user", JSON.stringify(user));
                    alert("Cadastro realizado com sucesso!");
                    window.location.href = "login.html";
                } else {
                    const error = await response.json();
                    console.error("Erro da API:", error);
                    alert(`Erro no cadastro: ${error.message || "Erro interno no servidor. Tente novamente mais tarde."}`);
                }
            } catch (err) {
                console.error("Erro ao tentar se comunicar com a API:", err);
                alert("Erro ao tentar realizar o cadastro. Verifique sua conexão ou tente novamente mais tarde.");
            }
        }

        chamarApi()

    });
});
