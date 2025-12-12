function renderCatalog() {
    const catalogDiv = document.getElementById("catalog");
    const catalog = read("spa_catalog");

    catalogDiv.innerHTML = catalog.map(p => `
        <div class="catalog-card">
            <img src="${p.image}">
            <h4>${p.name}</h4>
            <p>Precio: BS.${p.price}</p>
            <button onclick="addToCart(${p.id})">Agregar</button>
        </div>
    `).join("");
}