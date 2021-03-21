import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";
import { toast } from "react-toastify";
const AddCategory = () => {
  const [name, setName] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { user, token } = isAuthenticated();

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          toast.error(data.error, { position: "top-right" });
        } else {
          setSuccess(true);
          setError("");
          setName("");
          setError(data.error);
          toast.info(" New category was created successfully", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const categoryForm = () => {
    return (
      <div className="from">
        <div className="form-group mt-3">
          <label> Add Category</label>
          <input
            className="form-control my-3 p-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={onSubmit}
            className="btn btn-md btn-outline-info mb-3"
          >
            Add category
          </button>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        class="alert alert-success alert-dismissible fade show mt-3"
        role="alert"
        style={{ display: success ? "" : "none" }}
      >
        New category was created successfully
      </div>
    );
  };

  return (
    <Base
      title="Add Category"
      description="a page to add categories"
      className=" p-4 text-white bg-success"
    >
      <div className="row p-3">
        <div className="col-md-8 offset-md-2 bg-dark rounded">
          {categoryForm()}
          <Link
            to="/admin/dashboard"
            className="btn btn-sm btn-outline-warning mb-3"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </Base>
  );
};
export default AddCategory;
