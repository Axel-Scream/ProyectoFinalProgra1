function read(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
}

function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
