const modal = document.getElementById("modal");
const btnNueva = document.getElementById("btnNuevaTarea");
const cerrar = document.getElementById("cerrarModal");
const form = document.getElementById("taskForm");

btnNueva.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

cerrar.addEventListener("click", () => {
  modal.classList.add("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const tarea = {
    titulo: document.getElementById("titulo").value,
    descripcion: document.getElementById("descripcion").value
  };

  console.log("Nueva tarea (UI):", tarea);

  modal.classList.add("hidden");
  form.reset();
});