import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Cart from "./Cart/Cart";
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import { productthunkapi, stockdata } from "./Productslice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./Mainpage/Mainpage";

function App() {
  const dispatch = useDispatch();
  const {
    productstore: { ApiData },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(productthunkapi());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
