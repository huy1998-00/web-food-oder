import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllProducts } from "../context/actions/productActions";
import { getAllProduct } from "../API/index";

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!products) {
      getAllProduct().then((data) => {
        console.log("fetch data");
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return <div>DBHome</div>;
};

export default DBHome;
