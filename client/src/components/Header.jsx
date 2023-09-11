import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";

const Header = () => {
  return (
    <header className="fixed  flex backdrop-blur-md top-0 justify-between items-center px-12 md:px-20 py-6 z-50 inset-x-0">
      {/*logo can fix  */}
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img src={Logo} className="w-12" alt="" />
        <p className="font-semibold text-xl">Food</p>
      </NavLink>
      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex item-center justify-center gap-16">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/menu"}>Menu</NavLink>

          <NavLink to={"/service"}>Services</NavLink>

          <NavLink to={"/about"}>About Us</NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
