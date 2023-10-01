import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header, Cart, FeedBack } from "../components/index";
import { useSelector, useDispatch } from "react-redux";
import { addNewItemToCart, getAllCartItems } from "../API/index";
import { HiCurrencyRupee } from "../assets/icons/index";
import { motion } from "framer-motion";
import { ButtonClick, slideTop } from "../animations/index";
import Rating from "@mui/material/Rating";
import Modal from "@mui/material/Modal";
import { average } from "../ultis/styles";
import { getProductById, sendFeedback, getFeedbackById } from "../API";
import { setCartItems } from "../context/actions/cartAction";
import {
  alertSucess,
  alertNull,
  alertInfor,
} from "../context/actions/alertAcions";
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // product State
  const [detail, setdetail] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const isCart = useSelector((state) => state.isCart);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //star state
  const [star, setstar] = useState(null);

  //open modal state
  const [open, setopen] = useState(false);
  //message state
  const [message, setMessage] = useState("");

  //function handle rating change
  const handleStarChange = (e, newValue) => {
    setstar(newValue);
    console.log(newValue);
    setopen(true);
  };

  //function handle send item to cart
  const sendToCart = () => {
    const data = { ...detail };

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

  //function handle send feedback
  const handleSendFeedback = async () => {
    const data = {
      product_id: id,
      rating: star,
      message: message,
    };

    sendFeedback(data).then((res) => {
      setFeedback([{ data: data }, ...feedback]);
    });

    setopen(false);
    setMessage("");
  };

  // fetchdata
  useEffect(() => {
    getProductById(id).then((data) => {
      setdetail(data);
      console.log("fetched:", data);
    });

    getFeedbackById(id).then((data) => {
      setFeedback(data);
      console.log("fetched-feedback:", data);
    });
  }, [id]);

  return (
    <main className="flex w-screen min-h-screen flex-col items-center justify-start bg-primary">
      <Header></Header>
      <div className="w-full flex flex-col items-center justify-center mt-40 px-6  md:px-24 2xl:px-96 gap-8 pb-24">
        {/* dislay product detail */}

        <div className="w-full md:flex  gap-10  sm:grid sm:grid-cols-1 ">
          {/* block for image and infor */}
          <div className="basis-4/12  sm:flex sm:justify-center sm:items-center">
            {/* image */}
            <img
              src={detail?.imageURL}
              className=" sm:w-8/12  sm:h-[70%] md:w-full h-full "
              alt=""
            />
          </div>
          <div className="basis-7/12 flex flex-col  ">
            {/* block for infor */}
            <h1 className="text-headingColor lg:text-5xl md:text-3xl sm:text-2xl font-extrabold ">
              {detail?.product_name}
            </h1>
            <div className="lg:text-3xl md:text-2xl sm:text-lg font-semibold text-red-500 flex  justify-start gap-5 my-4">
              <p className="lg:text-lg md:text-lg sm:text-[14px] ">{`${average(
                detail?.rating
              )} / 5`}</p>
              <Rating
                value={average(detail?.rating)}
                onChange={(event, newValue) =>
                  handleStarChange(event, newValue)
                }
                precision={0.1}
              ></Rating>
              <div className="flex gap-3 ml-4">
                <HiCurrencyRupee className="text-red-500" />{" "}
                {parseFloat(detail?.product_price).toFixed(2)}
              </div>
            </div>
            <p className="text-lg font-semibold text-slate-500">
              {detail?.product_description}
            </p>
            <div className=" inline-block">
              <p className="font-semibold text-headingColor text-xl py-4 ">
                CATEGORY :
                <span className="text-lg text-textColor pl-6 ">
                  {detail?.product_Category}
                </span>
              </p>
            </div>
            <div>
              <motion.button
                onClick={sendToCart}
                {...ButtonClick}
                className="bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold shadow-md"
              >
                ADD TO CART
              </motion.button>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap4 my-4">
          <div className="w-full flex items-center justify-between ">
            <div className=" w-full flex items-center justify-between ">
              <div className="flex flex-col items-start justify-start gap-1">
                <p className="text-2xl text-headingColor font-bold">
                  Customer Feedback
                </p>
                <div className="w-40 h-1 rounded-md bg-orange-500"></div>
              </div>
            </div>
          </div>

          {/* feedback */}
          <div className="mt-6">
            {feedback?.length > 0 ? (
              feedback?.map((feed) => <FeedBack data={feed}></FeedBack>)
            ) : (
              <h1>This product doesn't have feedback yet :D</h1>
            )}
          </div>
        </div>
      </div>
      {/* modal */}
      <Modal
        open={open}
        onClose={() => setopen(false)}
        className="flex items-center justify-center h-screen w-full "
      >
        <motion.div
          {...slideTop}
          className=" w-300 md:w-508 bg-slate-100 backdrop-blur-lg shadow-md h-300 z-50 flex items-center justify-start flex-col rounded-md"
        >
          <h1 className="text-3xl text-headingColor font-semibold my-4">
            Thank you for sent us feedback :D{" "}
          </h1>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="w-10/12 h-40 rounded-md shadow-md"
            placeholder="More detail here...."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <motion.button
            onClick={handleSendFeedback}
            {...ButtonClick}
            className="w-4/5 bg-black text-white p-4 my-2 rounded-md text-2xl"
          >
            {" "}
            Send
          </motion.button>
        </motion.div>
      </Modal>
      {isCart && <Cart></Cart>}
    </main>
  );
};

export default ProductDetail;

///
