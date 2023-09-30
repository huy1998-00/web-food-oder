import React from "react";
import { img404 } from "../assets/index";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { ButtonClick } from "../animations";
import { FaArrowLeft } from "../assets/icons/index";
const Page404 = () => {
  return (
    <main className=" w-screen min-h-screen flex items-center justify-start flex-col">
      <div className="w-full flex flex-col items-center justify-center  px-6 md:px-12 2xl:px-40 gap-6 pb-2">
        <img src={img404} className="w-full md:w-656" alt="" />

        <motion.div {...ButtonClick}>
          <NavLink
            to={"/"}
            className="flex items-center justify-center gap-4 cursor-pointer text-2xl text-textColor font-semibold px-4 py-2 rounded-md border border-gray-300 hover:shadow-md"
          >
            <FaArrowLeft className="text-3xl text-textColor " /> Get back to
            Home
          </NavLink>
        </motion.div>
      </div>
    </main>
  );
};

export default Page404;
