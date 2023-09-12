import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import MaterialTable from "material-table";
const DataTable = ({ columns, data, title, actions }) => {
  const defaultTheme = createTheme();

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
