import React from "react";
import { motion } from "framer-motion";
import { FaOptinMonster } from "react-icons/fa";
import { Slider } from "../components/index";
const HomeSlider = () => {
  return (
    <motion.div className="w-full flex items-start justify-start flex-col">
      <div className="w-full flex items-center justify-between ">
        <div className=" w-full flex items-center justify-between ">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-2xl text-headingColor font-bold">
              Our Fresh & Healthy Fruits
            </p>
            <div className="w-40 h-1 rounded-md bg-orange-500"></div>
          </div>
        </div>
      </div>
      <Slider></Slider>
    </motion.div>
  );
};

export default HomeSlider;