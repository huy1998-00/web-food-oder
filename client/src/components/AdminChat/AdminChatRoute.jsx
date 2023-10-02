import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminChat from "./AdminChat";

const AdminChatRoute = () => {
  return (
    <div className="w-full h-full flex items-center justify-center mt-2">
      <div className="border-2 rounded-md w-full h-full flex overflow-hidden ">
        <AdminSidebar></AdminSidebar>
        <AdminChat className="w-8/12"></AdminChat>
      </div>
    </div>
  );
};

export default AdminChatRoute;
