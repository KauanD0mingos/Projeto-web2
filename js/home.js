document.addEventListener("DOMContentLoaded", function () {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const languageImages = {
        Python: "../image/python.jpeg",
        Java: "../image/java.png",
        PHP: "../image/php.jpeg",
        JavaScript: "../image/javascript.png",
    };

    if (!userInfo) {
        alert("Nenhum usuário logado. Redirecionando para a página de login.");
        window.location.href = "login.html";
        return;
    }

    // Mostrar nome e e-mail
    document.getElementById("user-name").textContent = `${userInfo.name}!`;
    document.getElementById("user-email").textContent = userInfo.email;

    // Mostrar linguagens com imagens
    const languagesList = document.getElementById("user-languages");
    userInfo.languages.forEach(language => {
        const li = document.createElement("li");

        // Criar imagem da linguagem
        const img = loadImage(languageImages[language] || "path/to/default-language.png");
        img.alt = language;
        img.style.width = "50px"; // Ajuste o tamanho conforme necessário
        img.style.marginRight = "10px";

        // Adicionar texto da linguagem
        const span = document.createElement("span");
        span.textContent = language;

        li.appendChild(img);
        li.appendChild(span);
        languagesList.appendChild(li);
    });

    // Lógica para logout
    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("user");
        alert("Você saiu com sucesso!");
        window.location.href = "login.html";
    });

    // Função de carregamento de imagem com fallback
    function loadImage(src) {
        const defaultImage = "path/to/default-language.png";
        const img = new Image();
        img.src = src;
        img.onerror = function () {
            this.src = defaultImage;
        };
        return img;
    }
});
