import React from "react";
import { ButtonClick } from "../animations";
import { Link, useNavigate } from "react-router-dom";
import { HiCurrencyRupee, IoBasket, MdStarRate } from "../assets/icons";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addNewItemToCart, getAllCartItems } from "../API";
import {
  alertSucess,
  alertNull,
  alertInfor,
} from "../context/actions/alertAcions";
import { setCartItems } from "../context/actions/cartAction";
import { average } from "../ultis/styles";
const SliderCard = ({ data, index }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //func handle send to cart
  const sendToCart = () => {
    if (user) {
      //call APi
      addNewItemToCart(user?.user_id, data).then((res) => {
        getAllCartItems(user?.user_id).then((items) => {
          //update cart in redux
          dispatch(setCartItems(items));
        });
        // popup message
        dispatch(alertSucess("Item added to cart"));
        setInterval(() => {
          dispatch(alertNull());
        }, 3000);
      });
    } else {
      dispatch(alertInfor("You need login"));
      setTimeout(() => {
        dispatch(alertNull());
        navigate("/login", { replace: true });
      }, 3000);
    }
  };

  //handle navigate to product detail

  return (
    <div className="bg-lightOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 w-full md:w-340 md:min-w-350 gap-3">
      <Link to={`/productdetail/${data.product_id}`}>
        <img src={data.imageURL} className="w-40 h-40 object-contain" alt="" />
      </Link>

      <div className="relative pt-8">
        <p className="text-xl text-headingColor font-semibold">
          {data.product_name}
        </p>
        <p className="text-lg font-semibold text-red-500 flex items-center justify-center gap-3">
          {data.rating.length > 1 ? (
            <div className="flex items-center justify-center mr-6 gap-1">
              <MdStarRate className="text-yellow-400"></MdStarRate>
              <p className="text-textColor">{average(data.rating)}</p>
            </div>
          ) : (
            <span className="text-[10px] text-textColor">No Rating </span>
          )}
          <HiCurrencyRupee className="text-red-500" />{" "}
          {parseFloat(data.product_price).toFixed(2)}
        </p>

        <motion.div
          {...ButtonClick}
          onClick={sendToCart}
          className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 right-2 cursor-pointer"
        >
          <IoBasket className="text-2xl text-primary" />
        </motion.div>
      </div>
    </div>
  );
};

export default SliderCard;
