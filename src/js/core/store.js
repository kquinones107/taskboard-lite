const STORAGE_KEY = "taskboard-lite-tasks";

export function getTasks() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (!storedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(storedTasks);

    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch (error) {
    console.error("Error al obtener tareas desde localStorage:", error);
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    if (!Array.isArray(tasks)) {
      throw new Error("saveTasks espera un arreglo de tareas");
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error al guardar tareas en localStorage:", error);
  }
}

export function clearTasks() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error al limpiar tareas en localStorage:", error);
  }
}