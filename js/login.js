const demoUser = { user: "admin", pass: "1234", name: "Administrador" };

function initLogin() {
    const formLogin = document.getElementById("formLogin");
    const loginMsg = document.getElementById("loginMsg");

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        let user = document.getElementById("inputUser").value;
        let pass = document.getElementById("inputPass").value;

        if (user === demoUser.user && pass === demoUser.pass) {
            sessionStorage.setItem("spa_user", JSON.stringify(demoUser));
            showApp();
        } else {
            loginMsg.textContent = "Usuario o contraseña incorrectos.";
        }
    });
}

function logout() {
    sessionStorage.removeItem("spa_user");
    location.reload();
}