import React from "react";
import { Avatar2 } from "../../assets/index";
const AdminSearch = () => {
  return (
    <div className="search border-b border-b-black">
      <div className="searchForm p-3  ">
        <input
          type="text"
          className="bg-transparent border-none text-white outline-none"
          placeholder="find a user"
        />
      </div>
    </div>
  );
};

export default AdminSearch;
