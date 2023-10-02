import React from "react";
import {
  DBHeader,
  DBHome,
  DBOrder,
  DBItems,
  DBNewItem,
  DBUser,
  DBEditProduct,
} from "../components/index";
import { Route, Routes } from "react-router-dom";
import AdminChatRoute from "./AdminChat/AdminChatRoute";
const DBRightSection = () => {
  return (
    <div className="flex flex-col pt-10 px-10 flex-1 h-full ">
      <DBHeader></DBHeader>
      {/* content */}
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none">
        <Routes>
          <Route path="/orders" element={<DBOrder></DBOrder>}></Route>

          <Route path="/home" element={<DBHome></DBHome>}></Route>
          <Route path="/items" element={<DBItems></DBItems>}></Route>
          <Route path="/newitem" element={<DBNewItem></DBNewItem>}></Route>
          <Route path="/users" element={<DBUser></DBUser>}></Route>
          <Route
            path="/edit/:id"
            element={<DBEditProduct></DBEditProduct>}
          ></Route>
          <Route
            path="/chat"
            element={<AdminChatRoute></AdminChatRoute>}
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default DBRightSection;
