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
    return null;
  }
};
