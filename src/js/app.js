import { getTasks, saveTasks } from "./core/store.js";
import { renderTasks } from "./developer-a/ui.render.js";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

const DOM = {
  openTaskModalBtn: null,
  closeTaskModalBtn: null,
  cancelTaskBtn: null,
  modal: null,
  modalOverlay: null,
  taskForm: null,

  todoCount: null,
  inProgressCount: null,
  doneCount: null,
};

let tasks = [];

function initApp() {
  setupDOMReferences();
  bindBaseEvents();

  tasks = getTasks();
  renderBoard(tasks);
}

function setupDOMReferences() {
  DOM.openTaskModalBtn = document.getElementById("openTaskModalBtn");
  DOM.closeTaskModalBtn = document.getElementById("closeTaskModalBtn");
  DOM.cancelTaskBtn = document.getElementById("cancelTaskBtn");
  DOM.modal = document.getElementById("taskModal");
  DOM.modalOverlay = document.getElementById("modalOverlay");
  DOM.taskForm = document.getElementById("taskForm");

  DOM.todoCount = document.getElementById("todo-count");
  DOM.inProgressCount = document.getElementById("in-progress-count");
  DOM.doneCount = document.getElementById("done-count");
}

function bindBaseEvents() {
  if (DOM.openTaskModalBtn) {
    DOM.openTaskModalBtn.addEventListener("click", openModal);
  }

  if (DOM.closeTaskModalBtn) {
    DOM.closeTaskModalBtn.addEventListener("click", closeModal);
  }

  if (DOM.cancelTaskBtn) {
    DOM.cancelTaskBtn.addEventListener("click", closeModal);
  }

  if (DOM.modalOverlay) {
    DOM.modalOverlay.addEventListener("click", closeModal);
  }

  if (DOM.taskForm) {
    DOM.taskForm.addEventListener("submit", handleTaskSubmit);
  }
}

function openModal() {
  if (!DOM.modal) return;

  DOM.modal.classList.remove("hidden");
  DOM.modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!DOM.modal || !DOM.taskForm) return;

  DOM.modal.classList.add("hidden");
  DOM.modal.setAttribute("aria-hidden", "true");
  DOM.taskForm.reset();
}

function handleTaskSubmit(event) {
  event.preventDefault();

  const formData = new FormData(DOM.taskForm);

  const newTask = {
    id: Date.now().toString(),
    title: formData.get("title")?.trim(),
    description: formData.get("description")?.trim(),
    status: formData.get("status"),
    priority: formData.get("priority"),
    dueDate: formData.get("dueDate"),
  };

  if (!newTask.title) {
    alert("El título es obligatorio");
    return;
  }

  tasks.push(newTask);
  saveTasks(tasks);
  renderBoard(tasks);
  closeModal();
}

function renderBoard(taskList) {
  renderTasks(taskList);

  const todo = taskList.filter((task) => task.status === "todo").length;
  const inProgress = taskList.filter(
    (task) => task.status === "in-progress"
  ).length;
  const done = taskList.filter((task) => task.status === "done").length;

  updateTaskCounters({
    todo,
    inProgress,
    done,
  });
}

function updateTaskCounters({ todo, inProgress, done }) {
  if (DOM.todoCount) DOM.todoCount.textContent = todo;
  if (DOM.inProgressCount) DOM.inProgressCount.textContent = inProgress;
  if (DOM.doneCount) DOM.doneCount.textContent = done;
}