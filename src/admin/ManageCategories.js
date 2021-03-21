import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategories,deleteCategory} from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");


  const {user,token}=isAuthenticated()

  const preload = () => {
    setError("");
    getCategories().then((data) => {
      if (data&&data.error) {
        setError(data.error);
      
      } else {
        setCategories(data);
        console.log(categories);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);


  const handleDelete=(cateId)=>{
    deleteCategory(user._id,token,cateId)
    .then(data=>{
        if(data.error){
            console.log(data.error);
        }
        else{
            preload()
            toast.error("category Deleted successfully",{position:"top-right"})
           
        }
    })
    .catch(err=>console.log(err))
  }

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

  return (
    <Base title="ManageCategories" description="page to manage categories " className="bg-dark text-white container justify-content-center p-4">
      <div>
       
        {errorMessage()}
        
        <h2 className="text-center mb-4 mt-0">Categories</h2>
        <div className="container ">
          {categories?.map((category, index) => (
            <div className="row ml-3" key={index}>
              <span className="col-md-4 text-capitalize offset-1">
                {index + 1}. {category.name}
              </span>
              <div className="col-md-4 ">
                <Link className="btn btn-sm btn-outline-warning mb-3" to={`/admin/update/category/${category._id}`}>
                  Update
                </Link>
              </div>
              <div className="col-md-3">
                <button onClick={()=>handleDelete(category._id)} className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          ))}
          <Link to="/admin/dashboard" className="btn btn-sm btn-outline-info mt-4">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
