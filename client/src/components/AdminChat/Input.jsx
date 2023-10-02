import React from "react";
import { MdAttachFile, MdImageSearch } from "../../assets/icons/index";
import { motion } from "framer-motion";
import { ButtonClick } from "../../animations/index";
const Input = () => {
  return (
    <div className="h-14 p-3 bg-primary flex items-center justify-between">
      <input
        type="text"
        className="w-full border-none outline-none text-xl bg-primary"
        placeholder="type something..."
      />
      <div className="send flex items-center justify-between gap-3 text-lgr">
        <MdAttachFile className="h-5 cursor-pointer"></MdAttachFile>
        <input type="file" name="" id="file" style={{ display: "none" }} />
        <label htmlFor="file">
          <MdImageSearch className="h-5 cursor-pointer"></MdImageSearch>
        </label>
        <motion.button
          {...ButtonClick}
          className="border-none bg-violet-400 text-white px-1 py-2 rounded-lg"
        >
          Send
        </motion.button>
      </div>
    </div>
  );
};

export default Input;
