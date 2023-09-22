import React from "react";
import { motion } from "framer-motion";
import { Rating } from "@mui/material";
import { Avatar2 } from "../assets/index";
const FeedBack = ({ data }) => {
  return (
    <motion.div className="w-full flex  px-3 py-2 border relative border-gray-200 bg-lightOverlay shadow-md rounded-md gap-8 my-4">
      <div>
        <img src={Avatar2} className="h-12 w-12" alt="" />
      </div>
      <div>
        <Rating value={data.data.rating} readOnly></Rating>
        <p>{data.data.message}</p>
      </div>
    </motion.div>
  );
};

export default FeedBack;
