document.addEventListener("DOMContentLoaded", function () {
    const api_url = 'https://projetoweb-api.vercel.app';
    const animeSelect = document.getElementById("anime_preference");

    const getAnimes = async () => {
        try {
            const response = await fetch(api_url + "/anime", {
                method: 'GET'
            });

            if (response.ok) {
                let animes = await response.json();
                animes = animes.animes; 
                animeSelect.innerHTML = "";
                animes.forEach((anime) => {
                    const option = document.createElement("option");
                    option.value = anime.id;
                    option.textContent = anime.title;
                    animeSelect.appendChild(option);
                });
            } else {
                console.error("Erro ao carregar os animes:", response.statusText);
            }
        } catch (err) {
            console.error("Erro ao carregar os animes:", err);
        }
    };

    getAnimes();

    const registerButton = document.querySelector(".login-button");

    registerButton.addEventListener("click", function () {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const selectedAnimeIds = Array.from(animeSelect.selectedOptions).map(option => option.value);

        if (name === "" || email === "" || password.length < 8) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password,
            anime_preference: selectedAnimeIds
        };

        console.log("Dados do usuário preparados para envio:", user);

        async function chamarApi() {
            try {
                registerButton.disabled = true;
                registerButton.textContent = "Enviando...";

                const response = await fetch(`${api_url}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });

                console.log("Resposta bruta da API:", response);

                if (response.ok) {
                    const data = await response.json();
                    console.log("Dados retornados pela API:", data);
                    localStorage.setItem("user", JSON.stringify(data));
                    alert("Cadastro realizado com sucesso!");
                    window.location.href = "login.html";
                } else {
                    const error = await response.json();
                    console.error("Erro retornado pela API:", error);
                    alert(`Erro no cadastro: ${error.message || "Erro interno no servidor. Tente novamente mais tarde."}`);
                }
            } catch (err) {
                console.error("Erro ao tentar se comunicar com a API:", err);
                alert("Erro ao tentar realizar o cadastro. Verifique sua conexão ou tente novamente mais tarde.");
            } finally {
                registerButton.disabled = false;
                registerButton.textContent = "Cadastrar";
            }
        }

        chamarApi();
    });
});
