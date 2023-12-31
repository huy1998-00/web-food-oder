import axios from "axios";

export const baseURL = "http://localhost:5001/foododer20/us-central1/app";

const UserToken = localStorage.getItem("token") || "";
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
///create user in user Collection

export const createUser = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/users/create`,
      { ...data },
      {
        headers: { Authorization: `Bearer ` + UserToken },
      }
    );
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

export const subcribleUser = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/users/subcrible`, { ...data });
    return res.data;
  } catch (error) {
    return null;
  }
};

//===============//========================

//Product===========
// them san pham
export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/create`,
      { ...data },
      {
        headers: { Authorization: `Bearer ` + UserToken },
      }
    );
    return res.data.data;
  } catch (error) {
    return error;
  }
};

// edit
export const editAProduct = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/update`,
      { ...data },
      {
        headers: { Authorization: `Bearer ` + UserToken },
      }
    );

    return res.data.data;
  } catch (error) {
    return error;
  }
};
// lấy tất cả sản phẩm

export const getAllProduct = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/all`, {
      headers: { Authorization: `Bearer ` + UserToken },
    });

    return res.data.data;
  } catch (error) {
    return error;
  }
};
/// delete product

export const deleteAProduct = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/delete/${productId}`,
      {
        headers: { Authorization: `Bearer ` + UserToken },
      }
    );

    return res.data.data;
  } catch (error) {
    return error;
  }
};

//get product by id
export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/api/products/detail/${id}`);

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
      { ...data },
      {
        headers: { Authorization: `Bearer ` + UserToken },
      }
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
      `${baseURL}/api/products/getCartItems/${userId}`,
      {
        headers: { Authorization: `Bearer ` + UserToken },
      }
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
      {
        headers: { Authorization: `Bearer ` + UserToken },

        params: { productId: productId, type: type },
      }
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
    const res = await axios.get(`${baseURL}/api/products/orders`, {
      headers: { Authorization: `Bearer ` + UserToken },
    });

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
      {
        headers: { Authorization: `Bearer ` + UserToken },

        params: { sts: sts },
      }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//==================Order=================

///====================Feedback==============
export const sendFeedback = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/feedback/create`,
      { ...data },
      {
        headers: { Authorization: `Bearer ` + UserToken },
      }
    );

    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const getFeedbackById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/api/feedback/get/${id}`);

    return res.data.data;
  } catch (error) {}
};

///====================Feedback==============
