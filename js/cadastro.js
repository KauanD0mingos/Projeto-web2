document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.querySelector(".login-button");

    registerButton.addEventListener("click", function () {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const linguagesSelect = document.getElementById("linguages");

        // Obter todas as linguagens selecionadas
        const selectedLinguages = Array.from(linguagesSelect.selectedOptions).map(option => option.value);

        // Validações básicas
        if (name === "" || email === "" || password.length < 8) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        // Salvar os dados do usuário no localStorage
        const user = {
            name: name,
            email: email,
            password: password,
            languages: selectedLinguages
        };

        localStorage.setItem("user", JSON.stringify(user));
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
    });
});
