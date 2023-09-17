import React, { useEffect } from "react";
import { Header, Home, HomeSlider, FilterSection } from "../components/index";
import { useSelector, useDispatch } from "react-redux";
import { setAllProducts } from "../context/actions/productActions";
import { getAllProduct } from "../API/index";
import { Cart } from "../components/index";
const Main = () => {
  const products = useSelector((state) => state.products);

  //cart state
  const isCart = useSelector((state) => state.isCart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!products) {
      getAllProduct().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <main className="flex w-screen min-h-screen flex-col items-center justify-start bg-primary">
      <Header></Header>
      <div className="w-full flex flex-col items-start justify mt-40 px-6  md:px-24 2xl:px-96 gap-12 pb-24">
        <Home></Home>
        <HomeSlider></HomeSlider>
        <FilterSection></FilterSection>
      </div>

      {isCart && <Cart></Cart>}
    </main>
  );
};

export default Main;
