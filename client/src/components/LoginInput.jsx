import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeInOut } from "../animations";
const LoginInput = ({
  placeholder,
  type,
  isSignup,
  inputState,
  inputStateFunc,
  icon,
}) => {
  const [isForcus, setIsForcus] = useState(false);

  return (
    <motion.div
      {...FadeInOut}
      className={`flex items-center justify-center gap-4 bg-lightOverlay backdrop-blur-md rounded-md w-full px-4 py-2 ${
        isForcus ? "shadow-md shadow-red-500" : "shadow-none"
      }`}
    >
      {icon}
      <input
        placeholder={placeholder}
        type={type}
        className={`w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none `}
        value={inputState}
        onChange={(e) => {
          inputStateFunc(e.target.value);
        }}
        // {khi forcus}
        onFocus={() => {
          setIsForcus(true);
        }}
        //khi khong forcus
        onBlur={() => {
          setIsForcus(false);
        }}
      ></input>
    </motion.div>
  );
};

export default LoginInput;
