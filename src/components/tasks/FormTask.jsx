import React from 'react';
import { useSelector } from 'react-redux';


function FormTask({todo, handleChange, titleFirstInput, titleSecondInput}) {

  const errorMsg = useSelector((state) => state.errorMessage);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="form-group">
        <label htmlFor="recipient-name" className="col-form-label">
          {titleFirstInput}
        </label>
        <input
          type="text"
          className="form-control"
          id="recipient-name"
          onChange={handleChange("title")}
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
        <textarea
          value={todo.description}
          onChange={handleChange("description")}
          style={{ resize: "none" }}
          rows="5"
          className="form-control"
          id="message-text"
        ></textarea>
        {errorMsg &&
          errorMsg === "the description cannot contain more than 300 characters" && (
            <div className="text-danger">{errorMsg}</div>
          )}
      </div>
    </form>
  );
}

export default FormTask;
