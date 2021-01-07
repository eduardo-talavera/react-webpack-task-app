import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodoAction, updateTodoAction } from "../redux/actions";

import { isAuthenticated } from "../auth"

import $ from "jquery";


function Modal({
  title,
  id,
  titleFirstInput,
  titleSecondInput,
  close = false,
  edit = false,
  singleTodo = {}
}) {

  const [todo, setTodo] = useState({
    title: '',
    description: ''
  });


  const dispatch = useDispatch();
  let errorMsg = false;
  errorMsg = useSelector((state) => state.error);

  const { user, token } = isAuthenticated();

  const init = () => {
    if (edit) {
      setTodo({
       title: singleTodo.title,
       description: singleTodo.description
      })
    }
    console.log('init...');
  }

  useEffect(() => {
    init();
  }, [])

  const handleChange = (name) => (event) => {
    setTodo({ ...todo, [name]: event.target.value });
  };

  const addTodo = (e) => {
    e.preventDefault();
    dispatch(addTodoAction(user, token, todo));
    if(!errorMsg) $(`#${id}`).modal('hide')    
    setTodo({
      title: '',
      description: ''
    })     
  }

  const updateTodo = (e) => {
    e.preventDefault();
    const {title, description} = todo;
    const { id } = singleTodo;

    dispatch(updateTodoAction(user, token, id, {updatedBy: user.name, title, description}));
    if(!errorMsg) $(`#${id}`).modal('hide')    
    setTodo({
      title: '',
      description: ''
    })     
  }

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog mt-5 py-5">
        <div className="modal-content container">
          <div className="modal-header mt-3" style={{margin: '0 1rem', paddingLeft: 0, paddingRight: 0}}>
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            {close && (
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            )}
          </div>
          <div className="modal-body">
            <form onSubmit={e => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">
                  {titleFirstInput}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="recipient-name"
                  onChange={handleChange('title')}
                  value={todo.title}
                />
                 {errorMsg && errorMsg === "Title is required" && (
                    <div className="text-danger">{errorMsg}</div>
                  )}
              </div>
              <div className="form-group">
                <label htmlFor="message-text" className="col-form-label">
                  {titleSecondInput}
                </label>
                <textarea value={todo.description} onChange={handleChange('description')} style={{resize: 'none'}} rows="5" className="form-control" id="message-text"></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer" style={{border: 'none'}}>
            <button
              type="button"
              className="btn btn-secondary mr-2"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button onClick={edit ? updateTodo : addTodo} type="button" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
