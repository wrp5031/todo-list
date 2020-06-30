import React, { useState } from 'react';
import { Button, TextField } from "@material-ui/core"
import { addTodo } from '../../Redux/redux'
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const AddTodo = () => {

  const [todo, setTodo] = useState('')
  const dispatch = useDispatch();

  const addTodoFunc = (todo) => dispatch(addTodo(todo))

  const handleTaskInputChange = ((event) => {
    setTodo(event.target.value);
  })

  const handleSubmit = ((event) => {

    event.preventDefault();
    if (todo.trim() !== '') {

      addTodoFunc({
        id: uuidv4(),
        content: todo,
        completed: false,
      })
    }

    else { alert('You tried to submit nothing!') }
    setTodo('')
  })

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        id="todo"
        name="todo"
        value={todo}
        placeholder="Enter a Todo"
        onChange={handleTaskInputChange}
      >
      </TextField>
      <Button type='submit'>Submit</Button>
    </form>
  )

}

export default AddTodo