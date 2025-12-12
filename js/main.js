function showApp() {
    document.getElementById("view-login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");

    const user = JSON.parse(sessionStorage.getItem("spa_user"));

    if (user) {
        document.getElementById("welcome").textContent = "Hola, " + user.name;
    }
}

function showModule(id) {
    document.querySelectorAll(".module").forEach(m => {
        if (m.id === id) {
            m.classList.remove("hidden");
        } else {
            m.classList.add("hidden");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {

    initLogin();
    initRegistro();
    initAgenda();
    if (!localStorage.getItem("spa_catalog")) {
    write("spa_catalog", [
        { id: 1, name: "Baño completo", price: 20, image:"img/banio.jpg" },
        { id: 2, name: "Corte de pelo", price: 30, image:"img/corte.jpg" },
        { id: 3, name: "Combo Baño + Corte", price: 45, image:"img/combo.jpg" }
    ]);
}
    renderCatalog();
    renderCart();

    if (sessionStorage.getItem("spa_user")) {
        showApp();
    }

    document.getElementById("btnLogout").addEventListener("click", logout);

    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            showModule(targetId);
        });
    });
});