export function createTaskCard(task) {
  const div = document.createElement("article");
  div.classList.add("task-card");

  div.innerHTML = `
    <div class="task-card__body">
      <h3 class="task-card__title">${task.title}</h3>
      <p class="task-card__description">${task.description || "Sin descripción"}</p>

      <div class="task-card__meta">
        <span class="task-badge">Prioridad: ${task.priority || "Media"}</span>
        ${task.dueDate ? `<span class="task-date">Fecha: ${task.dueDate}</span>` : ""}
      </div>
    </div>

    <div class="task-card__actions">
      <button class="task-btn task-btn--edit" type="button">Editar</button>
      <button class="task-btn task-btn--delete" type="button">Eliminar</button>
    </div>
  `;

  div.querySelector(".task-btn--edit").addEventListener("click", () => {
    console.log("Editar tarea", task.id);
  });

  div.querySelector(".task-btn--delete").addEventListener("click", () => {
    console.log("Eliminar tarea", task.id);
  });

  return div;
}

export function renderTasks(taskList) {
  const columns = {
    todo: document.getElementById("todo-tasks"),
    "in-progress": document.getElementById("in-progress-tasks"),
    done: document.getElementById("done-tasks"),
  };

  Object.values(columns).forEach((container) => {
    if (container) {
      container.innerHTML = "";
    }
  });

  taskList.forEach((task) => {
    const container = columns[task.status];
    if (!container) return;

    const card = createTaskCard(task);
    container.appendChild(card);
  });

  Object.values(columns).forEach((container) => {
    if (container && container.children.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p>No hay tareas en esta columna</p>
        </div>
      `;
    }
  });
}