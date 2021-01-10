import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    succes: false,
  });

  const { name, email, password, succes, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, succes: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          succes: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
        {error.length > 0 && error === "Name is required" && (
          <div className="text-danger">{error}</div>
        )}
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
        {error.length > 0 && error === "email is required" && (
          <div className="text-danger">{error}</div>
        )}
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
        {error.length > 0 && error === "Password is required" && (
          <div className="text-danger">{error}</div>
        )}
      </div>
      <button onClick={clickSubmit} className="btn btn-custom text-primary">
        <i className="far fa-paper-plane mr-2"></i>
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSucces = () => (
    <div className="alert alert-info mt-3" style={{ display: succes ? "" : "none" }}>
      New account is created. Please <Link to="/signin">Singin</Link>
    </div>
  );

  return (
    <div className="row justify-content-center mt-5 py-5">
      <div className="col-lg-4">
        <h1 className="text-center mb-3">Signup to Tasks App</h1>
        <p className="text-primary text-center h4">
          <Link to="/signin">Or SignIn</Link>
        </p>
        {showSucces()}
        {showError()}
        <div className="card p-5 mt-5">{signUpForm()}</div>
      </div>
    </div>
  );
};

export default Signup;
