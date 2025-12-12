function initAgenda() {
    const formAgenda = document.getElementById("formAgenda");
    const agendaList = document.getElementById("agendaList");

    formAgenda.addEventListener("submit", (e) => {
        e.preventDefault();

        let agenda = read("spa_agenda");
        const agendaDatetime = document.getElementById("agendaDatetime").value;
        const selectPetForAgenda = document.getElementById("selectPetForAgenda");
        const petId = Number(selectPetForAgenda.value);
        const service = document.getElementById("selectServiceForAgenda").value;

        let pets = read("spa_pets");
        let pet = pets.find(p => p.id === petId);
        if (!pet) return alert("Seleccione una mascota");

        agenda.push({
            id: Date.now(),
            datetime: agendaDatetime,
            petName: pet.name,
            service
        });

        write("spa_agenda", agenda);
        renderAgenda();
    });

    function renderAgenda() {
        let agenda = read("spa_agenda");
        agendaList.innerHTML = agenda.map(a => `<li>${a.datetime} – ${a.petName} – ${a.service}</li>`).join("");
    }

    renderAgenda();
}