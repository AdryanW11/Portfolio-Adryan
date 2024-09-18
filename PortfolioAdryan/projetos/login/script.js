document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const welcomePage = document.getElementById("welcome-page");
    const forgotPasswordBtn = document.getElementById("forgot-password");

    const passwordError = document.getElementById("password-error");
    const loginError = document.getElementById("login-error");

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Verifica se a senha tem pelo menos 8 caracteres
        if (password.length < 8) {
            passwordError.classList.remove("hidden");
            return;
        } else {
            passwordError.classList.add("hidden");
        }

        //cadastro
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        alert("Cadastro realizado com sucesso!");

        // Exibe o formulário de login
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const loginUsername = document.getElementById("login-username").value;
        const loginPassword = document.getElementById("login-password").value;

        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        if (loginUsername === storedUsername && loginPassword === storedPassword) {
            alert("Login realizado com sucesso!");
            loginForm.classList.add("hidden");
            welcomePage.classList.remove("hidden");
        } else {
            loginError.classList.remove("hidden");
            forgotPasswordBtn.classList.remove("hidden");
        }
    });

    // "Esqueci minha senha" - Volta ao cadastro
    forgotPasswordBtn.addEventListener("click", () => {
        loginError.classList.add("hidden");
        forgotPasswordBtn.classList.add("hidden");
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
    });
});
