import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getAllProduct, editAProduct } from "../API/index";
import { setAllProducts } from "../context/actions/productActions";
import { alertSucess, alertNull } from "../context/actions/alertAcions";
import { motion } from "framer-motion";
import { ButtonClick } from "../animations/index";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const DBEditProduct = () => {
  const { id } = useParams();

  const [price, setPrice] = useState();
  const [name, setName] = useState();

  const [description, setDescription] = useState();

  const [category, setCategory] = useState();
  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    getProductById(id).then((data) => {
      setName(data?.product_name);
      setPrice(data?.product_price);

      setDescription(data?.product_description);
      setImageURL(data?.imageURL);
      setCategory(data?.product_Category);
    });
  }, []);

  //function handle change information product

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlechangeInfor = async () => {
    const data = {
      product_id: id,
      product_name: name,
      product_Category: category,
      product_price: price,
      product_description: description,
      imageURL: imageURL,
    };
    console.log(data);
    editAProduct(data).then((res) => {
      dispatch(alertSucess("Product Updated"));
      setTimeout(() => {
        dispatch(alertNull());
        navigate("/dashboard/items", { replace: true });
      }, 3000);
      getAllProduct().then((response) => {
        dispatch(setAllProducts(response));
      });
    });
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4 mt-6 h-screen">
      <InputEdit
        inputValue={name}
        inputFunction={setName}
        label={"Name"}
      ></InputEdit>
      <InputEdit
        inputValue={price}
        inputFunction={setPrice}
        label={"Price"}
      ></InputEdit>

      <InputEdit
        inputValue={description}
        inputFunction={setDescription}
        label={"Description"}
      ></InputEdit>

      <InputEdit
        inputValue={category}
        inputFunction={setCategory}
        label={"Category"}
      ></InputEdit>

      <InputEdit
        inputValue={imageURL}
        inputFunction={setImageURL}
        label={"ImageURL"}
      ></InputEdit>

      <motion.button
        // onClick={handleSendFeedback}
        {...ButtonClick}
        className="w-4/5 bg-black text-white p-4 my-2 rounded-md text-2xl"
        onClick={() => {
          confirmAlert({
            title: "Confirm to change this product information",

            buttons: [
              {
                label: "Yes",
                onClick: () => handlechangeInfor(),
              },
              {
                label: "No",
                onClick: () => null,
              },
            ],
          });
        }}
      >
        {" "}
        SAVE
      </motion.button>
    </div>
  );
};

export default DBEditProduct;

export const InputEdit = ({ label, type, inputValue, inputFunction }) => {
  return (
    <div className="w-full ">
      <label
        className="text-headingColor text-2xl font-semibold pl-4"
        htmlFor=""
      >
        {label}
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => inputFunction(e.target.value)}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400 mt-2 "
      />
    </div>
  );
};
