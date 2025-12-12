function addToCart(id) {
    const cartList = document.getElementById("cartList");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");

    let cart = read("spa_cart");
    let catalog = read("spa_catalog");

    let prod = catalog.find(p => p.id === id);
    let exist = cart.find(i => i.id === id);

    if (exist) exist.qty++;
    else cart.push({ id: prod.id, name: prod.name, price: prod.price, qty: 1 });

    write("spa_cart", cart);
    renderCart();
}

function renderCart() {
    const cartList = document.getElementById("cartList");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");

    let cart = read("spa_cart");
    let subtotal = 0;

    cartList.innerHTML = cart.map(item => {
        subtotal += item.price * item.qty;
        return `<li>${item.name} x${item.qty} – BS.${item.price}</li>`;
    }).join("");

    subtotalEl.textContent = subtotal;
    totalEl.textContent = (subtotal * 1.12).toFixed(2);
}

document.getElementById("btnWhatsApp")?.addEventListener("click", function () {
    let cart = read("spa_cart");
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let msg = "Hola, quiero comprar estos productos:%0A%0A";
    cart.forEach(item => {
        msg += `- ${item.name} x${item.qty} = $${item.price * item.qty}%0A`;
    });

    let subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    let total = (subtotal * 1.12).toFixed(2);

    msg += `%0ASubtotal: $${subtotal}%0ATotal con IVA: $${total}`;

    let phone = "59169978874";
    let url = `https://wa.me/${phone}?text=${msg}`;

    window.open(url, "_blank");
});