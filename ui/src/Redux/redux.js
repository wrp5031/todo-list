import { combineReducers } from 'redux'

// Action Types
const GET_TODO = 'GET_TODO'
const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

// Action Creators
export const getTodos = (todos) => ({ type: GET_TODO, todos: todos })
export const addTodo = (todo) => ({ type: ADD_TODO, todo: todo });
export const deleteTodo = (todoIndex, todo) => ({ type: DELETE_TODO, index: todoIndex, todo: todo });
export const toggleTodo = (todoIndex, todo) => ({ type: TOGGLE_TODO, index: todoIndex, todo: todo });


// Reducer
const todosReducer = (state = [], action) => {

  switch (action.type) {

    case GET_TODO:
      return action.todos

    case ADD_TODO:
      return [...state, action.todo]

    case DELETE_TODO:
      const copyD = state.slice()
      copyD.splice(action.index, 1)
      return copyD

    case TOGGLE_TODO:
      const copyT = state.slice()
      copyT.splice(action.index, 1, {
        ...state[action.index],
        completed: !state[action.index].completed
      })
      return copyT

    default:
      return state
  }
};

const rootReducers = combineReducers({
  todos: todosReducer
})

export default rootReducers
