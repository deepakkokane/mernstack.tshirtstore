import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { Redirect } from "react-router-dom";
const Card = ({
  product,
  addtoCart = true,
  removeCart = false,
 changeReload
}) => {
  const [isRedirect, setIsRedirect] = useState(false);

  const showAddtoCart = () => {
    if (addtoCart) {
      return (
        <div className="col-12">
          <button
            onClick={() => {
              addItemToCart(product, () => setIsRedirect(true));
            }}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
        </div>
      );
    }
  };

  const sendRedirect = (isRedirect) => {
    if (isRedirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showRemoveCart = () => {
    if (removeCart) {
      return (
        <div className="col-12">
          <button
            onClick={() => {
              removeItemFromCart(product._id);
              changeReload()
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        </div>
      );
    }
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead font-weight-bold text-capitalize">
        {product.name}
      </div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead font-weight-normal text-wrap mt-3">
          {product.description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">
          $ {product.price}
        </p>
        <div className="row">
          {showAddtoCart()}
          {showRemoveCart()}
        </div>
      </div>
      {sendRedirect(isRedirect)}
    </div>
  );
};

export default Card;
