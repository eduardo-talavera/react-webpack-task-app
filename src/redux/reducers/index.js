import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  FILTER_TODOS,
  UPDATE_TODO,
  GET_TODO,
  LOADING,
  FAILURE,
  SUCCESS,
  MESSAGE,
} from "../actions/types";



const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        todos: [],
        loading: true,
        error: false,
      };

    case SUCCESS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
        error: false,
      };

    case MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    case FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case UPDATE_TODO:
      const {id, updatedBy, title, description, updatedAt} = action.payload
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id
            ? { ...todo, title, description, updatedBy, updatedAt }
            : todo
        ),
      };

    case FILTER_TODOS:

      const parseDate = (todo) => {
        let todoCopy = {...todo};
        let f = new Date(todoCopy.createdAt);
        todoCopy.createdAt = `${f.getDate()}/${f.getMonth()}/${f.getFullYear()}`;
        return todoCopy.createdAt;
      }

      return {
        ...state,
        todos: state.todos.filter((todo) => { 
           if (parseDate(todo) === action.payload) {
             return todo;
           }
        }),
      };  

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case GET_TODO:
      return {
        ...state,
        singleTodo: state.todos.find((todo) => todo.id === action.payload),
      };  

    default:
      return {
        state,
      };
  }
};

export default reducer;
