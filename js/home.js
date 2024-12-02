document.addEventListener("DOMContentLoaded", function () {
    const api_url = 'https://projetoweb-api.vercel.app';
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (!userInfo || !userInfo.token) {
        alert("Nenhum usuário logado. Redirecionando para a página de login.");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("user-name").textContent = `${userInfo.name}!`;
    document.getElementById("user-email").textContent = userInfo.email;

    const animesList = document.getElementById("user-animes");

    async function getUserAnimes() {
        try {
            const response = await fetch(`${api_url}/user/animes`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Animes do usuário:", data);

                if (data.animes && data.animes.length > 0) {
                    animesList.innerHTML = "";
                    data.animes.forEach(anime => {
                        const li = document.createElement("li");
                        li.textContent = anime.title;
                        animesList.appendChild(li);
                    });
                } else {
                    animesList.innerHTML = "<li>Nenhum anime registrado.</li>";
                }
            } else {
                const error = await response.json();
                console.error("Erro ao obter animes do usuário:", error);
                alert(`Erro ao carregar animes: ${error.message}`);
            }
        } catch (err) {
            console.error("Erro ao se comunicar com a API:", err);
            alert("Erro ao carregar os animes do usuário. Tente novamente mais tarde.");
        }
    }

    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("user");
        alert("Você saiu com sucesso!");
        window.location.href = "login.html";
    });

    getUserAnimes();
});
