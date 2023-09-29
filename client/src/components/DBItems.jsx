import React from "react";
import { DataTable } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { HiCurrencyRupee } from "../assets/icons/index";
import { alertSucess, alertNull } from "../context/actions/alertAcions";
import { setAllProducts } from "../context/actions/productActions";
import { getAllProduct, deleteAProduct } from "../API/index";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const DBItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // products data
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    getAllProduct().then((data) => {
      console.log("fetch data at item");
      dispatch(setAllProducts(data));
    });
  }, []);

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
                className="w-16 h-16 object-contain rounded-md"
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
            title: "Description",
            field: "product_description",
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
        data={products || []}
        title="List of Products"
        // handle actions
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (event, rowData) => {
              confirmAlert({
                title: "You want edit this product ?",

                buttons: [
                  {
                    label: "Yes",
                    onClick: () => {
                      navigate(`/dashboard/edit/${rowData.product_id}`, {
                        replace: true,
                      });
                    },
                  },
                  {
                    label: "No",
                    onClick: () => null,
                  },
                ],
              });
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (event, rowData) => {
              confirmAlert({
                title: "You want edit this product ?",

                buttons: [
                  {
                    label: "Yes",
                    onClick: () => {
                      deleteAProduct(rowData.product_id).then((res) => {
                        dispatch(alertSucess("Product Deleted "));
                        setTimeout(() => {
                          dispatch(alertNull());
                        }, 3000);
                        getAllProduct().then((data) => {
                          dispatch(setAllProducts(data));
                        });
                      });
                    },
                  },
                  {
                    label: "No",
                    onClick: () => null,
                  },
                ],
              });
            },
          },
        ]}
      />
    </div>
  );
};

// // call API
// deleteAProduct(rowData.product_id).then((res) => {
//   dispatch(alertSucess("Product Deleted "));
//   setInterval(() => {
//     dispatch(alertNull());
//   }, 3000);
//   //update redux store
//   getAllProduct().then((data) => {
//     dispatch(setAllProducts(data));
//   });
// });
export default DBItems;
