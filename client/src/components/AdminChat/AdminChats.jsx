import React from "react";
import { Avatar2 } from "../../assets/index";
const AdminChats = () => {
  return (
    <div className="userChat p-3 flex items-center gap-2 text-white cursor-pointer hover:bg-slate-900">
      <img
        src={Avatar2}
        className="h-10 w-10 rounded-[50%] object-cover"
        alt=""
      />
      <div className="userchatInfor">
        <span className="text-sm font-semibold">Jane</span>
      </div>
    </div>
  );
};

export default AdminChats;
