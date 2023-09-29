import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import MaterialTable from "material-table";
import { useDispatch } from "react-redux";
// import { deleteAProduct, getAllProduct, editAProduct } from "../API/index";
// import { alertSucess, alertNull } from "../context/actions/alertAcions";
// import { setAllProducts } from "../context/actions/productActions";
const DataTable = ({ columns, data, title, actions }) => {
  const defaultTheme = createTheme();

  console.log("table reload");
  return (
    <ThemeProvider theme={defaultTheme}>
      <MaterialTable
        columns={columns}
        data={data}
        title={title}
        actions={actions}
      ></MaterialTable>
    </ThemeProvider>
  );
};

export default DataTable;
