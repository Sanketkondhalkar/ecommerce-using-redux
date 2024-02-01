import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { setfavouriteflag } from "../Productslice";

const Product = ({ orderdata, item }) => {
  const dispatch = useDispatch();
  const {
    productstore: { favouriteflag },
  } = useSelector((state) => state);
  console.log(favouriteflag);
  const addfavourite = () => {
    dispatch(setfavouriteflag(item));
  };
  const removefavourite = () => {
    dispatch(setfavouriteflag(item));
  };

  return (
    <div className="productbox">
      <div className="idfmage">
        <div className="heart">
          {item.favouritevalue ? (
            <AiFillHeart
              color="red"
              size={30}
              onClick={addfavourite}
              title="favourite"
            />
          ) : (
            <AiOutlineHeart
              size={30}
              color="red"
              onClick={removefavourite}
              title="unfavourite"
            />
          )}
        </div>
        <img src={item.image} alt="image-error" />
      </div>
      <hr />
      <h3>{item.title}</h3>
      <div className="demo">
        <h4>Price:₹ {item.price}</h4>
        <h4>Rating:{item.rating.rate}%</h4>
      </div>
      <h4>Category:{item.category}</h4>
      <div className="btn">
        <button onClick={() => orderdata(item)}>Add to cart</button>
      </div>
    </div>
  );
};

export default Product;
