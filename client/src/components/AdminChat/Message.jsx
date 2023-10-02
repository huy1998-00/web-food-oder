import React from "react";
import { Avatar2 } from "../../assets/index";
const Message = ({ own }) => {
  return (
    <div
      className={`message  flex ${own ? "flex-row-reverse  " : ""} gap-4 mb-5`}
    >
      <div className="messinfor flex flex-col text-gray-300 font-light">
        <img
          src={Avatar2}
          className="w-8 h-8 rounded-full object-cover"
          alt=""
        />
        <span>Just now</span>
      </div>
      <div className="messcontent flex flex-col max-w-[80%] gap-3">
        <p
          className={`${
            own
              ? "bg-neutral-600 rounded-b-md rounded-l-md"
              : "bg-slate-500 rounded-b-md rounded-r-md"
          } px-2 py-3 max-w-max `}
        >
          hello
        </p>
        <img src={Avatar2} className="h-20 w-20" alt="" />
      </div>
    </div>
  );
};

export default Message;
