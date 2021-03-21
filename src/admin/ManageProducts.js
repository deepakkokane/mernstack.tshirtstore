import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";
const ManageProducts = () => {
  const { user, token } = isAuthenticated();
  const [products, setProducts] = useState([]);

  const preload = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const handleDelete = (productId) => {
    deleteProduct(user._id, token, productId)
      .then((data) => {
        if (data.error) {
          toast.error(data.error, { position: "top-right" });
        } else {
          preload();
          toast.info("Product Deleted Successfully !", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Base
      title="Manage Product"
      description="a page to manage products"
      className="p-4 bg-success container"
    >
      <Link
        className="btn btn-outline-light btn-md mb-3 rounded"
        to="/admin/dashboard"
      >
        Back to dashboard
      </Link>
      <div className="container bg-dark p-4 rounded  ">
        <h2 className="text-center text-light display-5 mb-4">Products</h2>
        {products &&
          products.map((product, index) => (
            <div className="row" key={index}>
              <div className="col-md-4 offset-1">
                <span className="text-white text-capitalize">
                  {index + 1}. {product.name}
                </span>
              </div>
              <div className="col-md-4 ">
                <Link
                  className="btn btn-success btn-md mb-3"
                  to={`/admin/update/product/${product._id}`}
                >
                  Update
                </Link>
              </div>
              <div className="col-md-3 ">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="btn btn-danger btn-small"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </Base>
  );
};

export default ManageProducts;
