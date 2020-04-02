import React from "react";

const Task = ({
  task,
  onChangeState,
  onEditTask,
  onDeleteTask,
  onAsignTask
}) => {
  return (
    <>
      <div className="card mb-3">
        <div className="card-header">{task.title}</div>
        <div className="card-body">
          <p className="card-text">{task.description}</p>
          <div className="row">
            <div className="col-12 col-sm-3">
              <button
                className="btn btn-outline-success "
                onClick={() => onChangeState()}
              >
                {task.isDone ? "Reiniciar" : "Finalizar"}
              </button>
            </div>
            <div className="col-12 col-sm-3">
              <button
                className="btn btn-outline-primary "
                onClick={() => onAsignTask()}
              >
                {task.asigned ? "Desasignarmela" : "Asignarmela"}
              </button>
            </div>
            <div className="col-12 col-sm-3">
              <button className="btn btn-warning " onClick={() => onEditTask()}>
                Editar
              </button>
            </div>
            <div className="col-12 col-sm-3  float-right">
              <button className="btn btn-danger" onClick={() => onDeleteTask()}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
