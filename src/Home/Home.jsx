import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Product/Product";
import {
  cartdata,
  filterdata,
  productcount,
  productthunkapi,
  setfavouriteflag,
  stockdata,
  totaldata,
} from "../Productslice";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const [randomnumber, setrandomnumber] = useState();
  const {
    productstore: { ApiData, cart, stock, totalcount, favouriteflag },
  } = useSelector((state) => state);
  console.log(ApiData);

  useEffect(() => {
    setrandomnumber(Math.floor(Math.random() * 100) + 1);
  }, [stock]);
  // console.log(randomnumber);

  const orderdata = (item) => {
    dispatch(cartdata(item));
    dispatch(stockdata(randomnumber));
    dispatch(totaldata());
    dispatch(productcount());
  };

  const getproductdata = (collection) => {
    dispatch(filterdata(collection));
  };
  const getproduct = () => {
    dispatch(productthunkapi());
  };

  return (
    <>
      <div className="collection">
        <button onClick={getproduct}>All</button>
        <button onClick={() => getproductdata("electronics")}>
          Electronics
        </button>
        <button onClick={() => getproductdata("jewelery")}>Jewelery</button>
        <button onClick={() => getproductdata("men's clothing")}>
          Men's clothing
        </button>
        <button onClick={() => getproductdata("women's clothing")}>
          Women's clothing
        </button>
      </div>
      <div className="home_container">
        {ApiData?.map((item) => {
          return <Product key={item.id} orderdata={orderdata} item={item} />;
        })}
      </div>
    </>
  );
};

export default Home;
