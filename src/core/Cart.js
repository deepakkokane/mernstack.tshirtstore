import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import Payment from "./Payment";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setCartProducts(loadCart());
  }, [reload]);

  const changeReload=()=>{
      setReload(!reload)
  }

  const cartItems = () => {
    return (
      <div>
        <h1> Cart Products section</h1>
        <div className="row mt-3" >
        {cartProducts.map((product, index) => (
              <div  key={index} className="col-4 mt-3"  style={{width:400}}>
            <Card
             
              product={product}
              addtoCart={false}
              removeCart={true}
              changeReload={changeReload}
            />
          </div>
        ))}
        </div>
      </div>
    );
  };

 

  return (
    <Base title="Cart Page" description="Checkout Here !">
      <h3 className="mb-2"></h3>
      <div className="row">
        <div className="col-8">{cartItems()}</div>
        <div className="col-4">
          <Payment products={cartProducts} changeReload={changeReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
