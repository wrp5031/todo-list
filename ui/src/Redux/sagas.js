import axios from 'axios';
import { takeEvery, all } from 'redux-saga/effects'

function* addTodoAsync(action) {
    yield axios.post('http://localhost:1323/todos', action.todo)
}

export function* watchAddTodo() {
    yield takeEvery('ADD_TODO', addTodoAsync)
}

function* delTodoAsync(action) {
    const id = action.todo.id
    yield axios.delete(`http://localhost:1323/todos/${(id)}`)
}

export function* watchDelTodo() {
    yield takeEvery('DELETE_TODO', delTodoAsync)
}

function* toggleTodoAsync(action) {
    const todo = action.todo
    yield axios.put(`http://localhost:1323/todos/${todo.id}`,
        {
            ...todo,
            completed: !todo.completed,
        })
}

export function* watchtoggleTodo() {
    yield takeEvery('TOGGLE_TODO', toggleTodoAsync)
}

export default function* rootSaga() {
    yield all([
        watchAddTodo(),
        watchDelTodo(),
        watchtoggleTodo()
    ])
};


