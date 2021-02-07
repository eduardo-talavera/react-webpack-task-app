import React from "react";
import { useDispatch } from "react-redux";
import { toggleTodoAction, getSingleTodoAction } from "../../redux/actions";
import { isAuthenticated } from "../../services/authService.js";



const CardTask = ({ todo }) => {
 
  const dispatch = useDispatch();
  const { user, token } = isAuthenticated();
  const sidebar = document.getElementById("sidebar");


  // Functions
  const openSidebar = (e) => {

    if(e.target.classList.contains('fa-check-circle')) return

    dispatch(getSingleTodoAction(user, token, todo.id));
    sidebar.classList.add("open_sidebar");

    if (sidebar.classList.contains("close_sidebar")) {
      sidebar.classList.remove("close_sidebar");
    }

  };

  const handleClick = () => {
    dispatch(toggleTodoAction(user, token, todo.id));
  }

  return (
    <div className="col-md-3">
      <div onClick={openSidebar} className="card card_task shadow-sm rounded m-1 p-3" style={{ cursor: "pointer" }}>

       <div className="d-flex w-100">
        {todo.completed ? (
            <i
              onClick={handleClick}
              className="fas fa-check-circle text-success mr-3"
              style={{ fontSize: "20px" }}
            ></i>
          ) : (
            <i
              onClick={handleClick}
              className="far fa-check-circle mr-3"
              style={{ color: "#a3a8b3", fontSize: "20px" }}
            ></i>
          )}
          <h6>{ todo.title }</h6>
       </div>

      </div>
    </div>
  );
};

export default CardTask;
