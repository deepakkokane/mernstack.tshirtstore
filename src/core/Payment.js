import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";
import { createOrder } from "./helper/orderHelper";
import { cartEmpty } from "./helper/cartHelper";

const Payment = ({ products, changeReload }) => {
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const [info, setInfo] = useState({
    success: false,
    loading: false,
    error: "",
    clientToken: null,
    instance: {},
  });

  const preload = () => {
    setInfo({...info,loading:true})
    getmeToken(userId, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setInfo({ ...info, error: data.error,loading:false });
        } else {
          setInfo({...info,loading:false})
          const clientToken = data.clientToken;
          setInfo({ clientToken });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const getTotalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const onPurchase = () => {
    let nonce;
    const getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getTotalAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          toast.success("Payment success !", { position: "top-right" });
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData).then((order) => {
            if (order.error) {
              toast.error(order.error, { position: "top-right" });
            }
          });
          cartEmpty(() => {});
          changeReload();
        })
        .catch((error) => {
          toast.error(error, { position: "top-right" });
        });
    });
  };

  return (
    <div>
      <h2 className="text-center">Checkout Here! </h2>
      <h4 className="mt-3 text-center text-info">
        Your TotalAmount is:
        <span className="text-white"> ${getTotalAmount()}</span>
      </h4>
      {info.clientToken !== null && products.length > 0 ? (
        <div>
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button onClick={onPurchase} className="btn btn-success btn-block w-100">
              Buy
            </button>
          </div>
        </div>
      ) : (
        info.loading ?(<h2 className="text-center ">Loading....</h2>):(  <h2 className="text-center text-warning">
        please login or add item to cart
      </h2>)
      )}
    </div>
  );
};

export default Payment;
