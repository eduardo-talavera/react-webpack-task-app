import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  FAILURE,
  SUCCESS,
  MESSAGE,
  LOADING,
  FILTER_TODOS,
  GET_TODO,
  UPDATE_TODO,
  STOP_LOADING,
} from "./types";

import {
  createTodo,
  removeTodo,
  getTodos,
  changeStatusTodo,
  read,
  updateTodo,
} from "../../services/todoService";

export const addTodoAction = (user, token, todo) => (dispatch) => {
  return new Promise((resolve, reject) => {
    createTodo(user.id, token, todo)
    .then((res) => {
      if (res.error) {
        dispatch({ type: FAILURE, payload: res.error});
        reject(res.error);
      } else {
        dispatch({type: ADD_TODO, payload: res.data});
        dispatch({ type: MESSAGE, payload: res.msg });
        dispatch({ type: FAILURE, payload: ""});
        resolve(res.msg);
      }
    })
    .catch(err => {
        dispatch({ type: FAILURE, payload: err });
        reject(err);
      }
    );
  });
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
        dispatch({ type: FAILURE, payload: "" });
      }
    })
    .catch((err) => dispatch({ type: FAILURE, payload: err }));
};


export const updateTodoAction = (user, token, todoId, data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    updateTodo(todoId, user.id, token, data)
      .then((res) => {
        if (res.error) {
          dispatch({ type: FAILURE, payload: res.error });
          reject(res.error);
        } else {
          dispatch({ type: UPDATE_TODO, payload: res.data });
          dispatch({ type: GET_TODO, payload: todoId });
          dispatch({type: STOP_LOADING})
          dispatch({ type: MESSAGE, payload: res.msg });
          dispatch({ type: FAILURE, payload: "" });
          resolve(res.msg);
        }
      })
      .catch((err) => {
        dispatch({ type: FAILURE, payload: err });
        reject(err);
      });
  });
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
        dispatch({ type: FAILURE, payload: "" });

        setTimeout(() => {
          dispatch({type: STOP_LOADING})
        },500);
      }
    })
    .catch((err) => dispatch({ type: FAILURE, payload: err }));
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
        dispatch({ type: GET_TODO, payload: todoId });
        dispatch({ type: STOP_LOADING});
        dispatch({ type: MESSAGE, payload: res.msg });
        dispatch({ type: FAILURE, payload: "" });
      }
    })
    .catch((err) => dispatch({ type: FAILURE, payload: err }));
};


export const readTodosAction = (user, token) => (dispatch) => {
  dispatch({ type: LOADING });
  getTodos(user.id, token)
    .then((data) => dispatch({ type: SUCCESS, payload: data }))
    .catch((err) => dispatch({ type: FAILURE, payload: err }));
};


export const filterTodoAction = (date) => (dispatch) => {
  dispatch({
    type: FILTER_TODOS,
    payload: date,
  });
};
