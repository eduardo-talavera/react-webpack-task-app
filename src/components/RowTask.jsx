import React from "react";
import moment from "moment";
import Sidebar from "../components/Sidebar";

import { useSelector, useDispatch } from "react-redux";
import { toggleTodoAction, getSingleTodoAction } from "../redux/actions";

import { isAuthenticated } from "../auth";

function RowTask({todo}) {

  const dispatch = useDispatch();
  const sidebar = document.getElementById('sidebar');

 const {user, token} = isAuthenticated();

  const openCloseSidebar = () => {
    dispatch(getSingleTodoAction(user, token, todo.id))
    sidebar.classList.add('open');
    if (sidebar.classList.contains('close')) {
      sidebar.classList.remove('close');
    }
    // console.log('open/close...');
  }

  return (
    <tr style={{cursor: 'pointer'}} onClick={openCloseSidebar}>
      <th scope="row">
        {todo.completed ? (
           <i onClick={() => dispatch(toggleTodoAction(user, token, todo.id))} className="fas fa-check-circle text-success ml-2" style={{fontSize: '20px'}}></i>
        ) : (
          <i onClick={() => dispatch(toggleTodoAction(user, token, todo.id))} className="far fa-check-circle ml-2" style={{color: '#a3a8b3', fontSize: '20px'}}></i>
        )}
      </th>
      <td>{todo.title}</td>
      <td>{moment(todo.createdAt).calendar()}</td>
      <td className="d-none d-md-table-cell">{todo.description}</td>
    </tr>
  );
}

export default RowTask;
