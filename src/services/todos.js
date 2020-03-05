export const getTodos = async () => {
  const tasks = await fetch("http://localhost:3000/api/tasks")
    .then(res => res.json())
    .then(result => result);
  return tasks;
};

export const saveTodos = async (title, description) => {
  fetch("http://localhost:3000/api/tasks", {
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

export const editTodos = async (id, title, description) => {
  console.log(id, title, description);

  fetch("http://localhost:3000/api/tasks", {
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

export const changeIsDone = async id => {
  const task = await fetch("http://localhost:3000/api/tasks/" + id);
  const res = await task.json();
  const newState = (await res[0].isDone) ? 0 : 1;

  fetch("http://localhost:3000/api/tasks", {
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

export const deleteTodos = async id => {
  fetch("http://localhost:3000/api/tasks/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => console.log(res));
};

export const saveTask = async () => {
  return "tarea guardada";
};
