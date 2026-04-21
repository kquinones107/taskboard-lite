export function openModal() {
  const modal = document.getElementById("taskModal");
  if (!modal) return;

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

export function closeModal() {
  const modal = document.getElementById("taskModal");
  const form = document.getElementById("taskForm");

  if (!modal) return;

  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");

  if (form) form.reset();
}

export function bindModalEvents() {
  const openBtn = document.getElementById("openTaskModalBtn");
  const closeBtn = document.getElementById("closeTaskModalBtn");
  const cancelBtn = document.getElementById("cancelTaskBtn");
  const overlay = document.getElementById("modalOverlay");
  const form = document.getElementById("taskForm");

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const task = {
        title: document.getElementById("taskTitle")?.value.trim(),
        description: document.getElementById("taskDescription")?.value.trim(),
        status: document.getElementById("taskStatus")?.value,
      };

      console.log("Nueva tarea (UI):", task);
      closeModal();
    });
  }
}