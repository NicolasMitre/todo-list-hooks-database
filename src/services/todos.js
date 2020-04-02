/* Obtener todas las tareas de la base de datos*/
export const getTodos = async () => {
  const tasks = await fetch("http://localhost:5000/api/tasks")
    .then(res => res.json())
    .then(result => result);
  return tasks;
};

/* Crea una nueva tarea y la envía con los datos del body a la base de datos */
export const saveTodos = async (title, description) => {
  await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      description: description,
      isDone: 0
    })
  });
};

/* Mediante un id detecta la tarea y actualiza su información */
export const editTodos = async (id, title, description) => {
  await fetch("http://localhost:5000/api/tasks", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id,
      title: title,
      description: description,
      isDone: 0
    })
  });
};

/* Actualiza el valor en la base de datos de "isDone" a su inverso */
export const changeIsDone = async id => {
  const task = await fetch("http://localhost:5000/api/tasks/" + id);
  const res = await task.json();
  const newState = (await res[0].isDone) ? 0 : 1;

  await fetch("http://localhost:5000/api/tasks", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id,
      title: res[0].title,
      description: res[0].description,
      isDone: newState
    })
  });
};

export const changeIsAsigned = async id => {
  const task = await fetch("http://localhost:5000/api/tasks/" + id);
  const res = await task.json();
  const newState = await !res[0].isAsigned;

  await fetch("http://localhost:5000/api/tasks", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id,
      title: res[0].title,
      description: res[0].description,
      isDone: res[0].isDone,
      isAsigned: newState
    })
  });
};

/**
 * Convertir a un delete logic
 */

/* Elimina de la base de datos una tarea segun el id */
export const deleteTodos = async id => {
  await fetch("http://localhost:5000/api/tasks/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => console.log(res));
};

// Mensaje opcional
export const saveTask = async () => {
  return "tarea guardada";
};
