import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodoAction, getSingleTodoAction, toggleTodoAction } from "../redux/actions";
import moment from "moment";
import Modal from "./Modal";
import { isAuthenticated } from "../auth";



function Sidebar() {

  const todo = useSelector((state) => state.singleTodo);
  const dispatch = useDispatch();
  const sidebar = document.getElementById("sidebar");
 
  const {user, token} = isAuthenticated();

  const f = todo ? new Date(todo.createdAt) : null;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const closeSidebar = () => {
    sidebar.classList.add("close");
    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
    }
  };

  const handleStatusChange = (idTodo) => {
    dispatch(toggleTodoAction(user, token, idTodo));
    dispatch(getSingleTodoAction(user, token, idTodo));
  };

  const showStatus = (todo) => (
    <>
      <div className="form-group mt-4">
        <select
          className="form-control"
          onChange={() => handleStatusChange(todo.id)}
          value={todo.completed}
        >
          <option value={false}>Status: Pending</option>
          <option value={true} >Status: Completed</option>
        </select>
      </div>
    </>
  );

  const deleteTodo = () => {
    closeSidebar();
    dispatch(deleteTodoAction(user, token, todo.id));
  };

  const showModal = () => (
      <Modal
      title="Edit Task"
      id="modalEditTask"
      titleFirstInput="Title (Required)"
      titleSecondInput="Description"
      edit={true}
    />
  );

  return (
    <>
      <div id="sidebar">
        <div className="container-fluid sidebar-content">
          <div>
            <div className="row mt-3">
              <div className="col-10"></div>
              <div className="col-2">
                <span
                  onClick={closeSidebar}
                  style={{ fontSize: "25px", cursor: "pointer", color: "gray" }}
                >
                  <i className="fas fa-times"></i>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {todo && <h4 className="mt-4">{todo.title}</h4>}
                {todo && showStatus(todo)}
                <h6>Created</h6>
                {todo && `${f.getDate()}/${months[f.getMonth()]}/${f.getFullYear()}` }
                <h6 className="mt-5">Description</h6>
                {todo && todo.description}

               {todo && todo.updatedBy && (
                <div className="mt-3">
                  <p>Updated {moment(todo.updatedAt).calendar()} <br/>
                  by {todo.updatedBy}</p>
                </div>
               )}
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-footer container-fluid">
          {todo && (
            <button onClick={deleteTodo} className="btn btn-secondary mr-3">
              <i className="fa fa-trash text-primary mr-3"></i>
              Delete
            </button>
          )}
          {todo && (
            <button
              className="btn btn-secondary"
              data-toggle="modal"
              data-target="#modalEditTask"
            >
              <i className="fa fa-pen text-primary mr-3"></i>
              Edit
            </button>
          )}
        </div>
      </div>

      {showModal()}
    </>
  );
}

export default Sidebar;
