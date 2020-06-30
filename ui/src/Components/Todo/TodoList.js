import React from 'react'
import { Checkbox, IconButton, ListItem, Typography, List } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo, toggleTodo } from '../../Redux/redux'

const TodoList = () => {

  // Grab the current state of todos from the store
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const deleteTodoFunc = (index, todo) => dispatch(deleteTodo(index, todo))
  const toggleTodoFunc = (index, todo) => dispatch(toggleTodo(index, todo))

  const handleCheckBox = ((index, todo) => () => {
    toggleTodoFunc(index, todo);
  });

  const handleDelTodo = ((index, todo) => () => {
    deleteTodoFunc(index, todo);
  });

  return (
    <List>
      {todos.map((todo, index) => (
        <ListItem key={todo.id} style={{ display: "flex" }}>

          <Checkbox checked={todo.completed} onClick={handleCheckBox(index, todo)} />
          <Typography
            variant="body1"
            style={{
              textDecoration: todo.completed ? "line-through" : null
            }}
          >
            {todo.content}
          </Typography>
          <IconButton onClick={handleDelTodo(index, todo)}>
            <CloseIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  )
}

export default TodoList