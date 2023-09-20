import { createSelector } from "reselect";

export const productListSelector = (state) => {
  const listProductWithFilter = state.products.products.filter((prod) =>
    prod.product_name.toLowerCase().includes(state.products.filter.search)
  );
  return listProductWithFilter;
};

export const userSearchTextSelector = (state) => state.products.filter.search;
