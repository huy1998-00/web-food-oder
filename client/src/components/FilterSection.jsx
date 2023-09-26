import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { staggerFadeInOut } from "../animations/index";
import { IoFastFood } from "../assets/icons/index";
import { statuses } from "../ultis/styles";
import { SliderCard } from "../components/index";
import { MdSearch } from "../assets/icons/index";
import Select from "react-select";

import { listProduct } from "../context/selector/productSelector";
import {
  filterByInput,
  filterByCategory,
  sortProducts,
} from "../context/actions/productActions";

const options = [
  { value: "ascending", label: "Price Low to High" },
  { value: "descending", label: "Price High to Low" },
];

const FilterSection = () => {
  const products = useSelector(listProduct);

  //state input user searching
  const [search, setsearch] = useState("");
  const [category, setcategory] = useState("all");

  // function handle user search product
  const dispatch = useDispatch();
  const handleUSerSearch = (e) => {
    setsearch(e.target.value);
    dispatch(filterByInput(e.target.value));
  };
  /// function handle category change
  const handleCategoryChange = (category) => {
    setcategory(category);
    dispatch(filterByCategory(category));
  };
  // function handle sort order change
  const handleSortOrderChange = (e) => {
    dispatch(sortProducts(e.value));
  };
  return (
    //can fix to top rated dish
    <motion.div className="w-full flex items-start justify-start flex-col">
      <div className="w-full flex items-center justify-between ">
        <div className=" w-full flex items-center justify-between ">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-2xl text-headingColor font-bold">
              Our Fresh & Healthy Foods
            </p>
            <div className="w-40 h-1 rounded-md bg-orange-500"></div>
          </div>
        </div>
      </div>
      {/* product by category */}

      <div className="w-full overflow-x-scroll pt-6 flex items-center justify-between gap-6 py-8 ">
        {/* category section */}
        {statuses &&
          statuses.map((data, i) => (
            <FilterCard
              data={data}
              category={category}
              setCategory={handleCategoryChange}
              index={Math.random()}
              key={i}
            />
          ))}
      </div>

      <div className="w-full  pt-2 flex items-center justify-center gap-6 py-8 ">
        {/* seaching and filter  section */}
        {/* cần thên tính năng tìm kiếm theo tên ở đây */}
        <div className=" flex items-center justify-center gap-3 px-4 py-2 bg-lightOverlay backdrop-blur-md rounded-md shadow-md">
          <MdSearch className="text-gray-400 text-2xl" />
          <input
            type="text"
            placeholder="Search Here..."
            className="border-none outline-none bg-transparent w-32 text-base font-semibold text-textColor"
            value={search}
            onChange={handleUSerSearch}
          />
        </div>
        <Select
          defaultValue={"Select.."}
          onChange={handleSortOrderChange}
          options={options}
        />
      </div>

      {/* product */}
      <div className=" w-full flex items-center justify-evenly flex-wrap gap-4 mt-12 ">
        {products.length > 0 ? (
          products.map((data, i) => (
            <SliderCard key={Math.random()} data={data} index={Math.random()} />
          ))
        ) : (
          <h1>No Product</h1>
        )}
      </div>
    </motion.div>
  );
};
// filter card for render product by category
export const FilterCard = ({ data, index, category, setCategory }) => {
  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      onClick={() => setCategory(data.category)}
      className={`group w-28 min-w-[128px] cursor-pointer rounded-md  py-6 ${
        category === data.category ? "bg-red-500" : "bg-primary"
      } hover:bg-red-500 shadow-md flex flex-col items-center justify-center gap-4`}
    >
      <div
        className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary ${
          category === data.category ? "bg-primary" : "bg-red-500"
        }`}
      >
        <IoFastFood
          className={`${
            category === data.category ? "text-red-500" : "text-primary"
          } group-hover:text-red-500`}
        />
      </div>
      <p
        className={`text-xl font-semibold ${
          category === data.category ? "text-primary" : "text-textColor"
        } group-hover:text-primary`}
      >
        {data.title}
      </p>
    </motion.div>
  );
};
export default FilterSection;
