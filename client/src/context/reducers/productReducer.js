import { all } from "axios";

const initialProduct = {
  filter: {
    search: "",
    category: all,
  },
  products: [],
};

const productReducer = (state = initialProduct, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return state.products;

    case "GET_BY_CATEGORY":
      return {
        ...state,
      };

    case "SET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "SORT_BY_PRICE":
      return state;

    case "FILTER_BY_INPUT":
      return {
        ...state,
        filter: {
          ...state.filter,
          search: action.payload,
        },
      };

    default:
      return state;
  }
};

export default productReducer;
