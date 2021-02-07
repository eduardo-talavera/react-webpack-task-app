import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readTodosAction, filterTodoAction } from "../../redux/actions";
import { isAuthenticated } from "../../services/authService.js";
import CardTask from "../../components/tasks/CardTask";
import Modal from "../../components/common/Modal";
import SidebarTask from "../../components/tasks/SidebarTask";
import DatePicker from "react-date-picker";
import preloader from "../../assets/img/preloader.gif";

const Home = () => {

  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos) || [];
  const { user, token } = isAuthenticated();


  useEffect(() => {
    dispatch(readTodosAction(user, token));
  }, []);


  const handleChangeDate = (date) => {
    setStartDate(date);
    filterByDate(date);
  };


  const filterByDate = (date) => {
    const f = new Date(date);
    const parseDate = `${f.getDate()}/${f.getMonth()}/${f.getFullYear()}`;
    if(date === null){
      dispatch(readTodosAction(user, token))
    }
    dispatch(filterTodoAction(parseDate))
  };


  return (
    <>
      <SidebarTask />
      <div className="content-tasks mb-5">
        <div className="row mt-4">
          <div className="col-12">
            <div>
              <div className="card-header">
                <div className="d-flex flex-wrap">
                  <h4 className="mr-5">Tasks</h4>
                  <div className="d-flex align-items-center flex-wrap">
                    <div className="mr-3 filter d-flex">
                      <span className="mr-1 mt-1 d-none d-md-block">Created: </span>
                      <DatePicker
                        onChange={(date) => {
                          handleChangeDate(date);
                        }}
                        value={startDate}
                      />
                    </div>
                    <div
                      className="text-secondary"
                      style={{ borderLeft: "1px solid", height: "60%" }}
                    ></div>
                    <button
                      type="button"
                      className="btn btn-custom text-primary ml-1"
                      data-toggle="modal"
                      data-target="#modalNewTask"
                    >
                      <i className="fas fa-plus-circle mr-2"></i>
                      Add Task
                    </button>
                    </div>
                    <Modal
                      title="New Task"
                      id="modalNewTask"
                      titleFirstInput="Title (Required)"
                      titleSecondInput="Description"
                    />
                  </div>
                </div>
              </div>
              
             <div className="container-fluid">
               <div className="row mt-5">
                {todos.length
                  ? todos.map((todo, i) => <CardTask key={i} todo={todo} />)
                  : null
                }
               </div>
             </div>

              {!todos.length && (
                <div className="content_preloader_home">
                  <img src={preloader} />
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
