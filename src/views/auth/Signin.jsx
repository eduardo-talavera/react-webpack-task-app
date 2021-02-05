import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../../services/authService.js";

const Signin = () => {

  // Hooks
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  // vars
  const { email, password, loading, error, redirectToReferrer } = values;



  // methods
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };


  // components

  const signInForm = () => (
    <form>
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

  const showLoading = () =>
    loading && (
      <div className="alert alert-info mt-3">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/" />
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />
    }
  };

  return (
    <div
      className="row justify-content-center mt-5 py-5"
    >
       <div className="col-lg-4">
        <h1 className="text-center mb-3">Signin to Tasks App</h1> 
        <p className="text-primary text-center h4">
          <Link to="/signup">Or SignUp</Link>
        </p>
        {showLoading()}
        {showError()}
        <div className="card p-5 mt-5">
          {signInForm()}
        </div>
        {redirectUser()}
       </div>
    </div>
  );
};

export default Signin;
