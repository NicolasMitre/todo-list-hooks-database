import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import { getTodos } from './services/todos'
import ListsContainer from './components/ListContainer';

const App = () => {
  
  const initialFormState = {
    name: "",
    description: ""
  }
  const [ tasks, setTasks ] = useState([])
  const [ form, setForm ] = useState( initialFormState )

  const handleChange = e => {
    const value = e.target.value
    const name = e.target.name

    setForm( {...form, [name]: value} )
  }
  const handleSubmit = e => {
    e.preventDefault()
    const { name, description } = form
    if ( form.id ) {
      const newTasks = tasks.map( task => task.id === form.id ? form : task )
      setTasks( newTasks )
      setForm( initialFormState )
    }
    else if ( name && description ) {
      const task = {
        name,
        description
      }      
      task.id = tasks[ tasks.length -1 ].id + 1
      setTasks( [ ...tasks, task ] )
      setForm( initialFormState )
    }
  }
  useEffect(() => {
    getTodos().then( data =>  setTasks( data ) )
  }, [])

  const changeTaskStatus = ( task ) => {
    const taskUpdated = tasks.map(taskEl => {
      if (taskEl.id === task.id)
        taskEl.done = !taskEl.done
      return taskEl
    })
    setTasks( taskUpdated )
  }
  const editTask = ( task ) => {
    setForm( task )
  }
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col mb-3">
          <Form
            onSubmit={ handleSubmit }
            onChange={ handleChange }
            form={ form }
          />
        </div>
        <ListsContainer
          tasks={ tasks }
          editTask={ editTask }
          changeTaskStatus={ changeTaskStatus }
        />
      </div>
    </div>
  );
}

export default App;
