import React from "react";
import { DataTable } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { HiCurrencyRupee } from "../assets/icons/index";
import { alertSucess, alertNull } from "../context/actions/alertAcions";
import { setAllProducts } from "../context/actions/productActions";
import { getAllProduct, deleteAProduct } from "../API/index";
const DBItems = () => {
  const dispatch = useDispatch();
  // products data

  const products = useSelector((state) => state.products);

  return (
    <div className=" flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable
        // setup columns
        columns={[
          {
            title: "Image",
            field: "imageURL",
            render: (rowData) => (
              <img
                src={rowData.imageURL}
                className="w-32 h-16 object-contain rounded-md"
              />
            ),
          },
          {
            title: "Name",
            field: "product_name",
          },
          {
            title: "Category",
            field: "product_Category",
          },
          {
            title: "Price",
            field: "product_price",
            render: (rowData) => (
              <p className="text-xl font-semibold text-textColor flex items-center justify-center ">
                <HiCurrencyRupee className="text-red-400" />
                {parseFloat(rowData.product_price).toFixed(2)}
              </p>
            ),
          },
        ]}
        data={products}
        title="List of Products"
        // handle actions
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (event, rowData) => {
              alert("You want to edit " + rowData.productId);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (event, rowData) => {
              if (
                window.confirm("Are you sure, you want to perform this aciton")
              ) {
                deleteAProduct(rowData.productId).then((res) => {
                  dispatch(alertSucess("Product Deleted "));
                  setInterval(() => {
                    dispatch(alertNull());
                  }, 3000);
                  getAllProduct().then((data) => {
                    dispatch(setAllProducts(data));
                  });
                });
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default DBItems;
