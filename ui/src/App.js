import React, { useEffect } from 'react';
import './App.css';
import Typography from "@material-ui/core/Typography"
import AddTodo from './Components/Todo/AddTodo'
import TodoList from './Components/Todo/TodoList';
import { getTodos } from './Redux/redux'
import { useDispatch } from 'react-redux'
import axios from 'axios';

const App = () => {

  const dispatch = useDispatch();
  const getTodoFunc = (todos) => dispatch(getTodos(todos))

  const getTodosEffect = (() => {
    let todos = []
    axios.get('http://localhost:1323/todos')
      .then((res) => {
        const data = res.data
        for (var key in data) {
          todos.push(data[key])
        }
        getTodoFunc(todos)
      })
  })

  useEffect(getTodosEffect, [])

  return (
    <div className="App">
      <Typography style={{ padding: 16 }} variant="h1"> TodoList </Typography>
      <AddTodo />
      <TodoList />
    </div>
  )
}

export default App;
