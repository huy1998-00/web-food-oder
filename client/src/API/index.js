import axios from "axios";

export const baseURL = "http://localhost:5001/foododer20/us-central1/app";
//USer====================
/// validate token function
export const validateUserJWT = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
      headers: { Authorization: `Bearer ` + token },
    });
    return res.data.data;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/all`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//===============//========================

//Product===========
// them san pham
export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data });

    return res.data.data;
  } catch (error) {
    return error;
  }
};
// lấy tất cả sản phẩm

export const getAllProduct = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/all`);

    return res.data.data;
  } catch (error) {
    return error;
  }
};
/// delete product

export const deleteAProduct = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/delete/${productId}`
    );

    return res.data.data;
  } catch (error) {
    return error;
  }
};

///===========Cart

// add to cart
export const addNewItemToCart = async (userId, data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/addToCart/${userId}`,
      { ...data }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};
// get all item in cart
export const getAllCartItems = async (userId) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/getCartItems/${userId}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// update cart item
export const updateCartItems = async (user_id, productId, type) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateCart/${user_id}`,
      null,
      { params: { productId: productId, type: type } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};
//====================/Cart/=========================

//==================Order=================
export const getAllOrder = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/orders`);

    return res.data.data;
  } catch (error) {
    return error;
  }
};

// update the order status
export const updateOrderSts = async (order_id, sts) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateOrder/${order_id}`,
      null,
      { params: { sts: sts } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//==================Order=================
