import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { staggerFadeInOut } from "../animations/index";
const FilterSection = () => {
  const [category, setcategory] = useState(null);
  const products = useSelector((state) => state.products);
  return (
    //can fix to top rated dish
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
      {/* product by category */}
      <div className="w-full overflow-x-scroll pt-6 flex items-center justify-center gap-6 py-8 "></div>
    </motion.div>
  );
};
// filter card for render product by category
export const FilterCard = ({ data, index, category, setCategory }) => {
  return <motion.div key={index} {...staggerFadeInOut(index)}></motion.div>;
};
export default FilterSection;
