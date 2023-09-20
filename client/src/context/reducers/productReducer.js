const initialProduct = {
  filter: {
    search: "",
    category: "all",
    sort: "",
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

    case "SORT_BY":
      return {
        ...state,
        filter: {
          ...state.filter,
          sort: action.payload,
        },
      };

    case "FILTER_BY_INPUT":
      return {
        ...state,
        filter: {
          ...state.filter,
          search: action.payload,
        },
      };
    case "FILTER_BY_CATEGORY":
      return {
        ...state,
        filter: {
          ...state.filter,
          category: action.payload,
        },
      };

    default:
      return state;
  }
};

export default productReducer;
