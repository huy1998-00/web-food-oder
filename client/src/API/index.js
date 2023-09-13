import axios from "axios";

export const baseURL = "http://localhost:5001/foododer20/us-central1/app";

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
/// delete produtch

export const deleteAProduct = async () => {};
