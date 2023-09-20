import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { Main, Login, DashBoard } from "./containers/index";
import { app } from "./config/filebase.config";
import { getAuth } from "firebase/auth";

import { useState } from "react";
import { validateUserJWT } from "./API";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetail } from "./context/actions/userActions";
import { motion } from "framer-motion";
import { FadeInOut } from "./animations";
import { Alert, MainLoader } from "./components/index";
import { getAllCartItems } from "./API/index";
import { setCartItems } from "./context/actions/cartAction";
import CheckoutSuccess from "./components/CheckoutSuccess";
import UserOrder from "./components/UserOrder";
const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoadding, setIsLoadding] = useState(false);
  const dispatch = useDispatch();

  //alert
  const alert = useSelector((state) => state.alert);
  // kiểm tra lần đầu người dùng đăng nhập hay chưa, nếu có thì đẩy vào redux store
  useEffect(() => {
    setIsLoadding(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          //lấy token người dùng gửi về backend qua API và nhận phản hồi
          validateUserJWT(token).then((data) => {
            if (data) {
              // get user's cart
              getAllCartItems(data.user_id).then((items) => {
                dispatch(setCartItems(items));
              });
            }

            // lưu trữ vào redux
            dispatch(setUserDetail(data));
          });
        });
      }
      setInterval(() => {
        setIsLoadding(false);
      }, 3000);
      // chuyển hướng
      // navigate("/", { replace: true });
    });
  }, []);
  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {/* loading screen */}
      {isLoadding && (
        <motion.div
          {...FadeInOut}
          className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLoader></MainLoader>
        </motion.div>
      )}
      <Routes>
        <Route path="*" element={<Main></Main>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>

        {/* cần fix route này chỉ có admin có thể truy cập được */}
        {/* <Route path="/dashboard/*" element={<DashBoard></DashBoard>}></Route>
        <Route
          path="/checkout-success"
          element={<CheckoutSuccess></CheckoutSuccess>}
        ></Route>
        <Route path="user-orders" element={<UserOrder></UserOrder>}></Route> */}
      </Routes>

      {/* alert popup message */}
      {alert?.type && (
        <Alert type={alert?.type} message={alert?.message}></Alert>
      )}
    </div>
  );
};

export default App;
