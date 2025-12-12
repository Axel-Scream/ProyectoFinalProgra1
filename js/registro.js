function initRegistro() {
    const formOwner = document.getElementById("formOwner");
    const formPet = document.getElementById("formPet");
    const ownersList = document.getElementById("ownersList");
    const petsList = document.getElementById("petsList");
    const selectOwnerForPet = document.getElementById("selectOwnerForPet");

    formOwner.addEventListener("submit", (e) => {
        e.preventDefault();

        let owners = read("spa_owners");
        let ownerName = document.getElementById("ownerName").value;
        let ownerPhone = document.getElementById("ownerPhone").value;
        let ownerEmail = document.getElementById("ownerEmail").value;

        owners.push({
            id: Date.now(),
            name: ownerName,
            phone: ownerPhone,
            email: ownerEmail
        });

        write("spa_owners", owners);
        formOwner.reset();
        renderOwners();
    });

    formPet.addEventListener("submit", (e) => {
        e.preventDefault();

        let pets = read("spa_pets");
        let petName = document.getElementById("petName").value;
        let petSpecies = document.getElementById("petSpecies").value;
        let petBreed = document.getElementById("petBreed").value;
        let ownerId = Number(selectOwnerForPet.value);

        let owners = read("spa_owners");
        let owner = owners.find(o => o.id === ownerId);
        if (!owner) return alert("Seleccione un dueño");

        pets.push({
            id: Date.now(),
            name: petName,
            species: petSpecies,
            breed: petBreed,
            ownerId,
            ownerName: owner.name
        });

        write("spa_pets", pets);
        formPet.reset();
        renderPets();
    });

    function renderOwners() {
        let owners = read("spa_owners");
        ownersList.innerHTML = owners.map(o => `<li>${o.name} – ${o.phone} – ${o.email}</li>`).join("");

        selectOwnerForPet.innerHTML = owners.map(o => `<option value="${o.id}">${o.name}</option>`).join("");
    }

    function renderPets() {
        let pets = read("spa_pets");
        petsList.innerHTML = pets.map(p => `<li>${p.name} – ${p.species} – ${p.breed} – Dueño: ${p.ownerName}</li>`).join("");
        renderPetSelect();
    }

    function renderPetSelect() {
        const selectPetForAgenda = document.getElementById("selectPetForAgenda");
        let pets = read("spa_pets");
        selectPetForAgenda.innerHTML = pets.map(p => `<option value="${p.id}">${p.name}</option>`).join("");
    }

    renderOwners();
    renderPets();
}