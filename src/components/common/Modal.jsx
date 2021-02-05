import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodoAction, updateTodoAction } from '../../redux/actions';
import { isAuthenticated } from '../../services/authService';
import FormTask from '../tasks/FormTask';
import $ from 'jquery';


const Modal = ({ title, id, titleFirstInput, titleSecondInput, close = false, edit = false }) => {

  //Hooks
  const [todo, setTodo] = useState({
    title: '',
    description: ''
  });

  // Vars
  const singleTodo = useSelector((state) => state.singleTodo);
  const dispatch = useDispatch();
  const { user, token } = isAuthenticated();


 // Events
  $(`#${id}`).on('show.bs.modal', function (e) {
    if (edit && singleTodo) {
      setTodo({
        title: singleTodo.title,
        description: singleTodo.description
      });
    }
  });


  // Functions
  const addTodo = () => {
    dispatch(addTodoAction(user, token, todo))
      .then(() => {
        $(`#${id}`).modal("hide");

        setTodo({
          title: "",
          description: "",
        });
      })
      .catch((err) => console.log(err));
  };


  const updateTodo = () => {
    const { title, description } = todo;
    const { id } = singleTodo;

    dispatch(
      updateTodoAction(user, token, id, {
        updatedBy: user.name,
        title,
        description,
      }))
      .then((msg) => {
        $('#modalEditTask').modal("hide");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (name) => (event) => {
    setTodo({ ...todo, [name]: event.target.value });
  };



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
          <div className="modal-header mt-3" style={{ margin: '0 1rem', paddingLeft: 0, paddingRight: 0 }}>
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
            <FormTask
              todo={todo}
              titleFirstInput={titleFirstInput}
              titleSecondInput={titleSecondInput}
              handleChange={handleChange}
            />
          </div>
          <div className="modal-footer d-flex justify-content-start justify-content-md-end" style={{ border: 'none' }}>
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
