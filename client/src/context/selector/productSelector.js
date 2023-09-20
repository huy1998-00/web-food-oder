import { createSelector } from "reselect";

// export const productListSelector = (state) => {
//   const listProductWithFilter = state.products.products.filter((prod) =>
//     prod.product_name.toLowerCase().includes(state.products.filter.search)
//   );
//   return listProductWithFilter;
// };

export const productsSelector = (state) => state.products.products;
export const categorySelector = (state) => state.products.filter.category;

export const userSearchTextSelector = (state) => state.products.filter.search;
export const shortOrder = (state) => state.products.filter.sort;
export const listProduct = createSelector(
  productsSelector,
  categorySelector,
  userSearchTextSelector,
  shortOrder,
  (prods, category, search, sort) => {
    if (category === "all") {
      if (sort === "ascending") {
        return prods
          .filter((prod) => prod.product_name.toLowerCase().includes(search))
          .sort((a, b) => a.product_price - b.product_price);
      } else {
        return prods
          .filter((prod) => prod.product_name.toLowerCase().includes(search))
          .sort((a, b) => b.product_price - a.product_price);
      }
    } else {
      if (sort === "ascending") {
        return prods
          .filter(
            (prod) =>
              prod.product_name.toLowerCase().includes(search) &&
              prod.product_Category === category
          )
          .sort((a, b) => a.product_price - b.product_price);
      } else {
        return prods
          .filter(
            (prod) =>
              prod.product_name.toLowerCase().includes(search) &&
              prod.product_Category === category
          )
          .sort((a, b) => b.product_price - a.product_price);
      }
    }
  }
);
