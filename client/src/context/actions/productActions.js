export const setAllProducts = (products) => {
  return {
    type: "SET_ALL_PRODUCTS",
    payload: products,
  };
};

export const getAllProducts = () => {
  return {
    type: "GET_ALL_PRODUCTS",
  };
};

export const getProductByCategory = (category) => {
  return {
    type: "GET_BY_CATEGORY",
    payload: category,
  };
};

export const shortByPrice = (payload) => {
  return {
    type: "SORT_BY_PRICE",
    payload,
  };
};

export const filterByInput = (text) => {
  return {
    type: "FILTER_BY_INPUT",
    payload: text,
  };
};

export const filterByCategory = (category) => {
  return {
    type: "FILTER_BY_CATEGORY",
    payload: category,
  };
};

export const sortProducts = (sort) => {
  return {
    type: "SORT_BY",
    payload: sort,
  };
};
