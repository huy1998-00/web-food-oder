import React from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSearch from "./AdminSearch";
import AdminChats from "./AdminChats";
const AdminSidebar = () => {
  return (
    <div className="w-4/12 border-r border-r-black bg-slate-500">
      <AdminNavbar></AdminNavbar>
      <AdminSearch></AdminSearch>
      <AdminChats></AdminChats>
    </div>
  );
};

export default AdminSidebar;
