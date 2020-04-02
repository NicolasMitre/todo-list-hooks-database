import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import {
  getTodos,
  saveTodos,
  editTodos,
  changeIsDone,
  deleteTodos,
  changeIsAsigned
} from "./services/todos";
import ListsContainer from "./components/ListContainer";
import CustomModal from "./components/common/CustomModal";
import useModalWithData from "./hooks/useModalWithData";

/* Inicio de la APP */
const App = () => {
  // Inicializando un estado vacio para que los campos del form siempre estén vacios cuando se requiera
  const initialFormState = {
    title: "",
    description: ""
  };

  // Creando hooks para las tareas, formulario y el modal personalizado
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [
    setIsModalOpened,
    isModalOpened,
    modalData,
    setModalData
  ] = useModalWithData();

  // Captura de información en los inputs del form y seteo en el mismo form
  const handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    setForm({ ...form, [name]: value });
  };

  // Apertura del modal personalizado con uso de los hooks
  const handleClickAddTask = () => {
    setForm(initialFormState);
    setModalData(initialFormState);
    setIsModalOpened(true);
  };

  /* Ejecución del evento onSubmit del Form */
  const handleSubmit = e => {
    e.preventDefault();

    // Structuring de los datos que tenemos en el form
    const { title, description } = form;

    // Si el form posee un atributo "id" ejecutamos lo siguiente:
    if (form.id) {
      const newTasks = tasks.map(task => (task.id === form.id ? form : task));

      setTasks(newTasks);
      setIsModalOpened(false);
      setForm(initialFormState);

      editTodos(form.id, form.title, form.description); // Actualiza en la base de datos la tarea especificada
    } else if (title && description) {
      const task = {
        title,
        description
      };

      setTasks([...tasks, task]);
      setIsModalOpened(false);
      setForm(initialFormState);

      saveTodos(task.title, task.description); // Guarda la informacion en la base de datos
    }
  };

  // Al montarse los componentes ejecutar el servicio de la API que trae las tareas de la base de datos
  useEffect(() => {
    getTodos().then(data => setTasks(data));
  }, []);

  /* Actualizar en la base de datos el estado isDone */
  const changeTaskStatus = async task => {
    // task.id es la tarea en particular de la cual se actualiza el estado
    // cuando termina de actualizar los datos en la base de datos se llama a todas las tareas, nuevamente
    await changeIsDone(task.id).then(() =>
      getTodos().then(data => setTasks(data))
    );
  };

  // Editar la tarea mandando los datos al form que se mandaran al modal
  const editTask = task => {
    setForm(task);
    setModalData(form);
    setIsModalOpened(true);
  };

  /**
   * Refactorizar para que sea un Logic Delete y no un delete
   */

  // Eliminar una tarea en particular por medio de su id
  const deleteTask = async task => {
    await deleteTodos(task.id).then(() =>
      getTodos().then(data => setTasks(data))
    );
  };

  const handleClickLogin = () => {
    const valor = localStorage.getItem("user") == 1 ? 2 : 1;
    localStorage.setItem("user", valor);
    getTodos().then(data => setTasks(data));
  };

  const asignTask = async task => {
    await changeIsAsigned(task.id).then(() =>
      getTodos().then(data => setTasks(data))
    );
  };

  // Reactive components returned
  return (
    <div className="container">
      <button className="btn btn-success float-left" onClick={handleClickLogin}>
        Login
      </button>
      <CustomModal
        isActive={isModalOpened}
        title={form.id ?? form.id > 0 ? "Editar tarea" : "Nuevo tarea"}
        handleClose={() => setIsModalOpened(false)}
      >
        <Form onSubmit={handleSubmit} onChange={handleChange} form={form} />
      </CustomModal>

      <div className="row mt-3">
        <div className="col">
          <h2>Tareas</h2>
        </div>
        <div className="col">
          <button
            className="btn btn-primary float-right"
            onClick={handleClickAddTask}
          >
            Agregar Tarea
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <ListsContainer
          tasks={tasks}
          editTask={editTask}
          changeTaskStatus={changeTaskStatus}
          deleteTask={deleteTask}
          asignTaks={asignTask}
        />
      </div>
    </div>
  );
};

export default App;
