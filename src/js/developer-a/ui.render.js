export function crearTarjeta(tarea) {
  const div = document.createElement("div");
  div.classList.add("task");

  div.innerHTML = `
    <h3>${tarea.titulo}</h3>
    <p>${tarea.descripcion}</p>

    <div class="task-buttons">
      <button class="editar">Editar</button>
      <button class="eliminar">Eliminar</button>
    </div>
  `;

  // Eventos (sin lógica real)
  div.querySelector(".editar").addEventListener("click", () => {
    console.log("Editar tarea", tarea.id);
  });

  div.querySelector(".eliminar").addEventListener("click", () => {
    console.log("Eliminar tarea", tarea.id);
  });

  return div;
}

export function renderTareas(listaTareas) {
  document.querySelectorAll(".task-container").forEach(c => c.innerHTML = "");

  listaTareas.forEach(tarea => {
    const tarjeta = crearTarjeta(tarea);

    const columna = document.querySelector(`#${tarea.estado} .task-container`);
    columna.appendChild(tarjeta);
  });
}