import React from "react";
import { FadeInOut } from "../animations";
import { motion } from "framer-motion";

import { BsExclamationTriangleFill, FaCheck } from "../assets/icons";
const Alert = ({ type, message }) => {
  if (type === "succes") {
    return (
      <motion.div
        {...FadeInOut}
        className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-emerald-400 shadow-md flex items-center gap-4"
      >
        <FaCheck className=" text-xl text-emerald-700"></FaCheck>
        <p className="text-xl text-emerald-700"> {message}</p>
      </motion.div>
    );
  }
  if (type === "warning") {
    return (
      <motion.div
        {...FadeInOut}
        className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-orange-400 shadow-md flex items-center gap-4"
      >
        <BsExclamationTriangleFill className=" text-xl text-orange-700"></BsExclamationTriangleFill>
        <p className="text-xl text-orange-700"> {message}</p>
      </motion.div>
    );
  }
  if (type === "info") {
    return (
      <motion.div
        {...FadeInOut}
        className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-blue-400 shadow-md flex items-center gap-4"
      >
        <BsExclamationTriangleFill className=" text-xl text-blue-700"></BsExclamationTriangleFill>
        <p className="text-xl text-blue-700"> {message}</p>
      </motion.div>
    );
  }
  if (type === "danger") {
    return (
      <motion.div
        {...FadeInOut}
        className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-red-400 shadow-md flex items-center gap-4"
      >
        <BsExclamationTriangleFill className=" text-xl text-red-700"></BsExclamationTriangleFill>
        <p className="text-xl text-red-700"> {message}</p>
      </motion.div>
    );
  }
};

export default Alert;
