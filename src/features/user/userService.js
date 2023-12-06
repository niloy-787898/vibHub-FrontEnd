import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const regester = async (userData) => {
  const response = await axios.post(`${base_url}user/regester`, userData);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
  }
  return response.data;
};
const login = async (logindata) => {
  const response = await axios.post(`${base_url}user/login`, logindata);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data;
  }
};
const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}user/all-wishlist`, config);
  if (response.data) {
    return response.data;
  }
};

const addToCart = async (userData) => {
  const response = await axios.post(`${base_url}user/cart`, userData, config);
  if (response.data) {
    return response.data;
  }
};
const getCart = async () => {
  const response = await axios.get(`${base_url}user/all-cart`, config);
  if (response.data) {
    return response.data;
  }
};

const createOrder = async (orderDetail) => {
  try {
    const response = await axios.post(
      `${base_url}user/cart/create-order`,
      orderDetail,
      config
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const getUserOrders = async () => {
  try {
    const response = await axios.get(
      `${base_url}user/get-orders`,
      config
    );
    if (response.data) {
      console.log("response data",response.data)
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const updateProductQuantityFromCart = async (cartDetail) => {
  const response = await axios.delete(
    `${base_url}user/update-product-quantity-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const removeProductFromCart = async (cartItemId) => {
  const response = await axios.delete(
    `${base_url}user/delete-product-cart/${cartItemId}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

export const authService = {
  regester,
  login,
  getUserWishlist,
  addToCart,
  getCart,
  updateProductQuantityFromCart,
  removeProductFromCart,
  createOrder,
  getUserOrders
};
