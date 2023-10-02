import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../ultis/styles";
const DBLeftSection = () => {
  return (
    <div className="h-full py-12 flex flex-col bg-lightOverlay backdrop-blur-md shadow-md  min-w-210 w-300 gap-3">
      {/*logo can fix  */}
      <NavLink to={"/"} className="flex items-center justify-start px-6 gap-4">
        <img src={Logo} className="w-12" alt="" />
        <p className="font-semibold text-xl">Food</p>
      </NavLink>
      <hr></hr>
      {/* admin navbar */}
      <ul className="flex flex-col gap-4">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/dashboard/orders"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Orders
        </NavLink>
        <NavLink
          to={"/dashboard/items"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Items
        </NavLink>
        <NavLink
          to={"/dashboard/newItem"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Add New Item
        </NavLink>
        <NavLink
          to={"/dashboard/chat"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Live Support
        </NavLink>
        <NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Users
        </NavLink>
      </ul>
    </div>
  );
};

export default DBLeftSection;
