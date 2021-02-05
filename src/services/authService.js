import { API } from '../helpers/constants';


const headers =  {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export const signup = async (user) => fetch(`${API}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify(user)
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));




export const signin = async (user) => fetch(`${API}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify(user)
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));



export const authenticate = ( data, next ) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
}


export const signout = async ( next ) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    next();

    return fetch(`${API}/signout`)
      .then((res) => console.log('signout', res))
      .catch((err) => console.log(err));
  }
};


export const isAuthenticated = () => {
  if (typeof window == 'undefined') return false
  if (localStorage.getItem('jwt')) return JSON.parse(localStorage.getItem('jwt'));
  else return false;
}