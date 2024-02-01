import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterdata, productthunkapi } from "../Productslice";

const Navbar = () => {
  const [searchdata, setsearchdata] = useState("");
  useEffect(() => {
    gethomedata();
  }, []);

  const {
    productstore: { cart, totalcount },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const cartOnClick = () => {};

  const getinputdata = (e) => {
    // console.log(e.target.value);
    const data = e.target.value;
    setsearchdata(data);
  };
  const getsearchdata = () => {
    dispatch(filterdata(searchdata));
  };
  const gethomedata = () => {
    dispatch(productthunkapi());
  };
  return (
    <div className="navbar_main">
      <div className="logo" onClick={gethomedata}>
        <img src="images/demo.png" alt="navbar_img_404" />
      </div>
      <div className="menubar">
        <ul>
          <Link to="/">
            <li className="data">Home</li>
          </Link>
          {/* <li className="data">Category</li> */}
          {/* <li>contact</li> */}
          {/* <li className="data">About us</li> */}
        </ul>
      </div>
      <div className="search_box">
        <input
          type="search"
          placeholder="search the product category wise...🔎"
          onChange={getinputdata}
          value={searchdata}
        />
        <button type="submit" onClick={getsearchdata}>
          Search
        </button>
      </div>

      <Link to="/cart">
        <div className="cart" onClick={cartOnClick}>
          <h1>{totalcount}</h1>
          <h1>🛒</h1>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
