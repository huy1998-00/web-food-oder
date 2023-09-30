import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../ultis/styles";
import { motion } from "framer-motion";
import { ButtonClick, slideTop } from "../animations";
import { MdShoppingCart, MdLogout } from "../assets/icons/index";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app } from "../config/filebase.config";
import { setUserNull } from "../context/actions/userActions";
import { setCartOn } from "../context/actions/displayCartAction";
const Header = () => {
  // lấy thông tin người dùng
  const user = useSelector((state) => state.user);

  //in4 cart
  const cart = useSelector((state) => state.cart);
  // state dropdownmenu
  const [isMenu, setIsMenu] = useState(false);

  //handle signout
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fireBaseAuth = getAuth(app);
  const signOut = () => {
    fireBaseAuth.signOut().then(() => {
      dispatch(setUserNull());
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    });
  };

  return (
    <header className="fixed  flex backdrop-blur-md top-0 justify-between items-center px-12 md:px-20 py-6 z-50 inset-x-0">
      {/*logo can fix  */}
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img src={Logo} className="w-12" alt="" />
        <p className="font-semibold text-xl">Food</p>
      </NavLink>
      {/* nav bar */}
      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex item-center justify-center gap-16">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/about"}
          >
            About Us
          </NavLink>
        </ul>
        {/* cart icon */}
        <motion.div
          {...ButtonClick}
          className="relative cursor-pointer"
          onClick={() => dispatch(setCartOn())}
        >
          <MdShoppingCart className="text-3xl text-textColor"></MdShoppingCart>
          {cart?.length > 0 && (
            <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1">
              <p className="text-primary text-base font-semibold">
                {cart?.length}
              </p>
            </div>
          )}
        </motion.div>
        {/* user manage */}
        {user ? (
          // user avatar
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => {
              setIsMenu(true);
            }}
          >
            <div className="w-12 h-12 rounded-full shadow-md overflow-hidden flex items-center justify-center">
              <motion.img
                className="w-full h-full object-cover"
                src={user?.picture ? user?.picture : Avatar}
                whileHover={{ scale: 1.2 }}
                referrerPolicy="no-referer"
              ></motion.img>
            </div>
            {/* dropdown  menu*/}
            {isMenu && (
              <motion.div
                {...slideTop}
                onMouseLeave={() => {
                  setIsMenu(false);
                }}
                className="px-6 py-4 bg-lightOverlay w-48 backdrop-blur-md rounded-md  shadow-md absolute top-12 right-0 flex flex-col gap-4"
              >
                {user?.user_id === process.env.REACT_APP_ADMIN_ID && (
                  <Link
                    className="hover:text-red-400 text-xl text-textColor"
                    to={"/dashboard/home"}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  className="hover:text-red-400 text-xl text-textColor"
                  to={"/profile"}
                >
                  My Profile
                </Link>
                <Link
                  className="hover:text-red-400 text-xl text-textColor"
                  to={"/user-orders"}
                >
                  Order
                </Link>
                <hr></hr>
                <motion.div
                  onClick={signOut}
                  {...ButtonClick}
                  className="group flex justify-center items-center px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-300 gap-3"
                >
                  <MdLogout className="text-2xl text-textColor group-hover::text-headinColor"></MdLogout>
                  <p className="text-textColor text-xl group-hover::text-headinColor">
                    Signout
                  </p>
                </motion.div>
              </motion.div>
            )}
          </div>
        ) : (
          <NavLink to={"/login"}>
            <motion.button
              {...ButtonClick}
              className="px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer"
            >
              Login
            </motion.button>
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
