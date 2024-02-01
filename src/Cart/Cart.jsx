import React from "react";
import "./cart.css";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { BsFillBackspaceFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  cartdata,
  decerementcount,
  deletedata,
  incrementcount,
  placeorder,
  productcount,
  setttotaldata,
  totaldata,
} from "../Productslice";
import Home from "../Home/Home";

const Cart = () => {
  const navigate = useNavigate();
  const {
    productstore: { ApiData, cart, totalprice },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const deletecard = (_id) => {
    dispatch(deletedata(_id));
    dispatch(totaldata());
    dispatch(productcount());
  };

  const increment = (item) => {
    dispatch(incrementcount(item));
    dispatch(totaldata());
    dispatch(productcount());
  };
  const decreament = (item) => {
    dispatch(decerementcount(item));
    dispatch(totaldata());
    if (item.count == 1) {
      deletecard(item.id);
    }
    dispatch(productcount());
  };
  const setalert = () => {
    swal({
      title: "Good job!",
      text: "your order has been successfully ",
      icon: "success",
    });
    navigate("/");
    dispatch(placeorder());
    dispatch(setttotaldata());
  };

  return (
    <>
      {cart.length === 0 ? (
        <>
          <div className="container"></div>
        </>
      ) : (
        <>
          <h1>your cart count:({cart.length} items)</h1>
          <div className="close">
            <Link to="/">
              <BsFillBackspaceFill
                size={40}
                color="black"
                style={{ marginLeft: "84px" }}
              />
            </Link>
          </div>

          <div className="productcart">
            {cart?.map((item) => {
              return (
                <div className="card" key={item.id}>
                  <div className="image">
                    <img src={item.image} alt="image error at cart" />
                  </div>
                  <div className="title">
                    <h4>{item.title}</h4>
                  </div>
                  <div className="price">
                    <h4>₹ {item.price}/-</h4>
                  </div>
                  <div className="price">
                    <h4>stock: {item.stock} Remaining</h4>
                  </div>
                  <div className="quantity">
                    <h4>
                      <button onClick={() => increment(item)}>+</button>
                      {item.count}
                      <button onClick={() => decreament(item)}>-</button>
                    </h4>
                  </div>
                  <div className="quantity">
                    <h4>total :₹ {Math.trunc(item.count * item.price)} /-</h4>
                  </div>

                  <div className="deletebutton">
                    <FaTrash size={20} onClick={() => deletecard(item.id)} />
                  </div>
                </div>
              );
            })}
          </div>
          <hr style={{ marginTop: "50px" }} />

          <h1>Total price:₹{Math.trunc(totalprice)} /-</h1>
          <h1>
            <button className="buttondata" onClick={setalert}>
              Place order
            </button>
          </h1>
        </>
      )}
    </>
  );
};

export default Cart;
