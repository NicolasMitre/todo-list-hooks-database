import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import {
  getTodos,
  saveTodos,
  editTodos,
  changeIsDone,
  deleteTodos
} from "./services/todos";
import ListsContainer from "./components/ListContainer";

const App = () => {
  const initialFormState = {
    title: "",
    description: ""
  };

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(initialFormState);

  const handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    setForm({ ...form, [name]: value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { title, description } = form;
    if (form.id) {
      const newTasks = tasks.map(task => (task.id === form.id ? form : task));
      setTasks(newTasks);
      setForm(initialFormState);
      editTodos(form.id, form.title, form.description);
    } else if (title && description) {
      const task = {
        title,
        description
      };
      saveTodos(task.title, task.description);
      setTasks([...tasks, task]);
      setForm(initialFormState);
    }
  };
  useEffect(() => {
    getTodos().then(data => setTasks(data));
  }, []);

  const changeTaskStatus = async task => {
    //pasa el id de la tarea que cambia el estado
    await changeIsDone(task.id).then(() =>
      getTodos().then(data => setTasks(data))
    );
  };
  const editTask = task => {
    setForm(task);
  };

  const deleteTask = async task => {
    await deleteTodos(task.id).then(() =>
      getTodos().then(data => setTasks(data))
    );
  };
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col mb-3">
          <Form onSubmit={handleSubmit} onChange={handleChange} form={form} />
        </div>
        <ListsContainer
          tasks={tasks}
          editTask={editTask}
          changeTaskStatus={changeTaskStatus}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default App;
