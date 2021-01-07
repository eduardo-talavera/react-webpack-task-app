import { API } from "./config";


export const createTodo =  async (userId, token, todoData) => {
  return await fetch(`${API}/todos/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(todoData)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}

export const getTodos =  async (userId, token) => {
  return await fetch(`${API}/todos/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err));
}

export const read =  async (idTodo, userId, token) => {
  return await fetch(`${API}/todos/${idTodo}/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err));
}

export const updateTodo =  async (idTodo, userId, token, todoData) => {
  return await fetch(`${API}/todos/${idTodo}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(todoData)
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err));
}

export const removeTodo = async (idTodo, userId, token) => {
  return await fetch(`${API}/todos/${idTodo}/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err));
}

export const changeStatusTodo = async (idTodo, userId, token) => {
  return await fetch(`${API}/todos/${idTodo}/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err));
}

