import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ApiData: [],
  filterapi: [],
  status: "ideal",
  cart: [],
  count: 1,
  flag: false,
  totalprice: 0,
  totalcount: 0,
  stock: Math.floor(Math.random() * 100) + 1,
  favouriteflag: false,
  // searchdata: "",
};
const Productslice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cartdata: (state, action) => {
      const data = action.payload;
      state.flag = false;
      const newdata = state.cart.map((item) => {
        if (item.id === data.id) {
          state.flag = true;
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
      if (state.flag === false) {
        state.cart = [
          ...state.cart,
          { ...data, count: state.count, stock: state.stock },
        ];
      } else {
        state.cart = newdata;
      }
    },
    stockdata: (state, action) => {
      state.stock = action.payload;
      console.log(action.payload);
    },
    deletedata: (state, action) => {
      state.cart = state.cart.filter((item) => {
        return item.id !== action.payload;
      });
    },
    totaldata: (state) => {
      state.totalprice = state.cart.reduce((total, current) => {
        // console.log(current);
        total = total + current.price * current.count;
        // console.log(total);
        return total;
      }, 0);
    },
    incrementcount: (state, action) => {
      const id = action.payload.id;
      const newdata = state.cart.map((item) => {
        if (item.id === id) {
          return { ...item, count: item.count + 1, stock: item.stock - 1 };
        }
        return item;
      });
      state.cart = newdata;
    },
    decerementcount: (state, action) => {
      const id = action.payload.id;
      const newdata = state.cart.map((item) => {
        if (item.count > 0) {
          if (item.id === id) {
            return { ...item, count: item.count - 1, stock: item.stock - 1 };
          }
        }
        return item;
      });
      state.cart = newdata;
    },
    filterdata: (state, action) => {
      console.log("action.payload:", action.payload);
      state.ApiData = state.filterapi.filter((item) => {
        return item.category === action.payload;
      });
    },
    placeorder: (state, action) => {
      state.cart = [];
    },
    productcount: (state, action) => {
      state.totalcount = state.cart.reduce((total, current) => {
        total = total + current.count;
        return total;
      }, 0);
    },
    setfavouriteflag: (state, action) => {
      const data = action.payload;
      state.ApiData = state.ApiData.map((item) => {
        if (item.id === data.id) {
          console.log("data.id", data.id);
          return { ...item, favouritevalue: !item.favouritevalue };
        }
        return item;
      });
    },
    setttotaldata: (state, action) => {
      state.totalcount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productthunkapi.pending, (state) => {
        state.status = "pending";
      })
      .addCase(productthunkapi.fulfilled, (state, action) => {
        state.ApiData = action.payload;
        state.ApiData = state.ApiData.map((item) => {
          return { ...item, favouritevalue: state.favouriteflag };
        });
        state.filterapi = action.payload;
        // console.log(action.payload);
        state.status = "success";
      })
      .addCase(productthunkapi.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
export const productthunkapi = createAsyncThunk("/products", async () => {
  const data = await axios
    .get("https://fakestoreapi.com/products")
    .then((resp) => resp.data)
    .catch((err) => console.log(err.message));
  return data;
});

export const {
  cartdata,
  deletedata,
  totaldata,
  incrementcount,
  decerementcount,
  filterdata,
  stockdata,
  placeorder,
  productcount,
  setfavouriteflag,
  setttotaldata,
} = Productslice.actions;
export default Productslice.reducer;
