import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodoAction, toggleTodoAction } from "../../redux/actions";
import { isAuthenticated } from "../../services/authService";
import moment from "moment";
import { months } from "../../helpers/constants";
import Modal from "../common/Modal";
import preloader from "../../assets/img/preloader.gif";


const SidebarTask = () => {
  const todo = useSelector((state) => state.singleTodo);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const sidebar = document.getElementById("sidebar");
  const { user, token } = isAuthenticated();
  const f = todo ? new Date(todo.createdAt) : null;

  const closeSidebar = () => {
    sidebar.classList.add("close");
    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
    }
  };

  const handleStatusChange = (idTodo) => {
    dispatch(toggleTodoAction(user, token, idTodo));
  };


  const status = (todo) => (
    todo.completed ? (
      <button onClick={() => handleStatusChange(todo.id)} className="btn btn-success text-white btn-sm">Completed</button>
    ) : (
      <button onClick={() => handleStatusChange(todo.id)} className="btn btn-primary btn-sm">Pending</button>
    )
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
      <div id="sidebar" className="shadow">
        <div>
          {loading && (
            <div className="content_preloader">
              <img src={preloader} />
            </div>
          )}

          {/* sidebarAll */}
          {!loading && (
            <div className="sidebar_all">
              <div className="sidebar-content">
                <div className="container" >
                  <div className="row justify-content-between align-items-center mt-3">
                    <div className="col-10">
                      <div className="px-3">
                        {todo && status(todo)}
                      </div>
                    </div>
                    <div className="col-2">
                      <span
                        onClick={closeSidebar}
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                          color: "gray",
                        }}
                      >
                        <span>➜</span>
                        {/* <i className="fas fa-times"></i> */}
                      </span>
                    </div>
                  </div>

                  <hr/>

                  <div className="container">
                    <div className="sidebar-body">
                      <div className="row">
                        <div className="col-12">
                          <div className="px-2">
                            {todo && <h4 className="mt-2">{todo.title}</h4>}
                            <h6 className="mt-5 font-weight-normal">Created: &nbsp; 
                              {todo &&
                                `${f.getDate()}/${
                                  months[f.getMonth()]
                              }/${f.getFullYear()}`}
                            </h6>
                          
                            {todo && todo.description && (
                              <>
                                <h6 className="mt-5">Description: </h6>
                                <h6 className="font-weight-normal">{todo.description}</h6>
                              </>
                            )}

                            {todo && todo.updatedBy && (
                              <div className="mt-5">
                                <h6 className="font-weight-normal">
                                  Updated {moment(todo.updatedAt).calendar()} <br />
                                  by {todo.updatedBy}
                                </h6>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sidebar-footer mt-5">
                <div className="container">
                 <div className="px-2">
                  {todo && (
                      <button
                        onClick={deleteTodo}
                        className="btn btn-secondary mr-3"
                      >
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
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal()}
    </>
  );
};

export default SidebarTask;
