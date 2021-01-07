import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, FAILURE, SUCCESS, MESSAGE, LOADING, FILTER_TODOS, GET_TODO, UPDATE_TODO } from "./types";
import { createTodo, removeTodo, getTodos, changeStatusTodo, read, updateTodo } from "../../requests";


export const addTodoAction = (user, token, todo) => (dispatch) => {
  createTodo(user.id, token, todo)
    .then((res) => {
      if (res.error) {
        dispatch({
          type: FAILURE,
          payload: res.error
        });
      } else {
        dispatch({
          type: ADD_TODO,
          payload: res.data,
        });
        dispatch({
          type: MESSAGE,
          payload: res.msg,
        });
        dispatch({
          type: FAILURE,
          payload: false
        });
      }
    })
    .catch((err) => dispatch({ type: FAILURE, payload: err }))
};




export const deleteTodoAction = (user, token, todoId) => (dispatch) => {
 removeTodo(todoId, user.id, token)
    .then((res) => {
      if (res.error) {
        dispatch({
          type: FAILURE,
          payload: res.error,
        });
      } else {
        dispatch({ type: DELETE_TODO, payload: todoId });
        dispatch({ type: MESSAGE, payload: res.msg });
        dispatch({ type: FAILURE, payload: false });
      }
    })
    .catch((err) => dispatch({ type: FAILURE, payload: err }))
};




export const updateTodoAction = (user, token, todoId, data) => (dispatch) => {
  console.log('data => => ',data)
  updateTodo(todoId, user.id, token, data)
     .then((res) => {
       if (res.error) {
         dispatch({
           type: FAILURE,
           payload: res.error,
         });
       } else {
         console.log(res);
         dispatch({ type: UPDATE_TODO, payload: res.data });
         dispatch({ type: MESSAGE, payload: res.msg });
         dispatch({ type: FAILURE, payload: false });
       }
     })
     .catch((err) => dispatch({ type: FAILURE, payload: err }))
 };


export const getSingleTodoAction = (user, token, todoId) => (dispatch) => {
  read(todoId, user.id, token)
     .then((res) => {
       if (res.error) {
         dispatch({
           type: FAILURE,
           payload: res.error,
         });
       } else {
         dispatch({ type: GET_TODO, payload: todoId });
         dispatch({ type: MESSAGE, payload: res.msg });
         dispatch({ type: FAILURE, payload: false });
       }
     })
     .catch((err) => dispatch({ type: FAILURE, payload: err }))
 };

export const toggleTodoAction = (user, token, todoId) => (dispatch) => {
  changeStatusTodo(todoId, user.id, token)
     .then((res) => {
       if (res.error) {
         dispatch({
           type: FAILURE,
           payload: res.error,
         });
       } else {
         dispatch({ type: TOGGLE_TODO, payload: todoId });
         dispatch({ type: MESSAGE, payload: res.msg });
         dispatch({ type: FAILURE, payload: false });
       }
     })
     .catch((err) => dispatch({ type: FAILURE, payload: err }))
 };

export const readTodosAction = (user, token) => (dispatch) => {

  dispatch({ type: LOADING });
    getTodos(user.id, token)
    .then((data) => dispatch({ type: SUCCESS, payload: data }))
    .catch((err) => dispatch({ type: FAILURE, payload: err }))
};


export const filterTodoAction =  (date) => (dispatch) => {
  dispatch({
    type: FILTER_TODOS,
    payload: date
  })
};