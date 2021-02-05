import { API } from '../helpers/constants';


const headers = token => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
});


// Crea una nueva tarea
export const createTodo = async (userId, token, todoData) =>
  fetch(`${API}/todos/${userId}`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify(todoData)
  })
  .then( response => response.json())
  .catch( err => console.log(err));



// Obtiene todad las tareas
export const getTodos = async (userId, token) => 
  fetch(`${API}/todos/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then( response => response.json() )
  .catch( err => console.log(err) );



// Obtiene una tarea por su id
export const read = async (idTodo, userId, token) => 
  fetch(`${API}/todos/${idTodo}/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then( response => response.json() )
  .catch( err => console.log(err));



// Actualiza una tarea
export const updateTodo = async (idTodo, userId, token, todoData) => 
  fetch(`${API}/todos/${idTodo}/${userId}`, {
    method: 'PUT',
    headers: headers(token),
    body: JSON.stringify(todoData)
  })
  .then( response => response.json() )
  .catch( err => console.log(err));



// Elimina una tarea
export const removeTodo = async (idTodo, userId, token) => 
  fetch(`${API}/todos/${idTodo}/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  .then( response => response.json() )
  .catch( err => console.log(err));



// Cambia el estado de la tarea
export const changeStatusTodo = async (idTodo, userId, token) => 
  fetch(`${API}/todos/${idTodo}/${userId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  .then(response => response.json() )
  .catch(err => console.log(err));


