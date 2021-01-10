import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from "redux-thunk" 

const initialState = {
  todos: [],
  errorMessage: '',
  loading: false,
  message: "",
  singleTodo: {
    id:null,
    updatedByUserId:null,
    userAssignedId:null,
    title:"",
    description:"",
    completed:false
  }
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);