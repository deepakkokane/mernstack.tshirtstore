import React from "react";
import { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper/index";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
    .then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true
        });
      }
    })
    .catch(console.log("Error in signup"));
  };

  const signupForm = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <form>
          <div className="form-group">
            <label className="text-light">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={handleChange("name")}
            />
          </div>
          <div className="form-group">
            <label className="text-light">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={handleChange("email")}
            />
          </div>
          <div className="form-group">
            <label className="text-light">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handleChange("password")}
            />
          </div>
          <button onClick={onSubmit} className="btn btn-success btn-block mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signup Page" description="A page for user Signup">
      {successMessage()}
      {errorMessage()}
      {signupForm()}
    </Base>
  );
};

export default Signup;
