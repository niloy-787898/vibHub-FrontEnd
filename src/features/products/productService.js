import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProducts = async (data) => {
  
  const response = await axios.get(`${base_url}product?${data?.catagory?`catagory=${data?.catagory}&&`:""}${data?.brand?`brands=${data?.brand}&&`:""}${data?.tag?`tags=${data?.tag}&&`:""}${data?.maxPrice?`price[lte]=${data?.maxPrice}&&`:""}${data?.minPrice?`price[gte]=${data?.minPrice}&&`:""}${data?.sort?`sort=${data?.sort}&&`:""}`);
  if (response.data) {
    return response.data;
  }
};
const getSingleProducts = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data;
  }
};

const addToWishList = async (productId) => {
  const response = await axios.put(`${base_url}product/wishlist`, { productId }, config);
  if (response.data) {
    return response.data;
  }
};

const rateProduct = async (data) => {
  const response = await axios.put(`${base_url}product/rating`,  data , config);
  if (response.data) {
    return response.data;
  }
};

export const productService = {
  getProducts,
  getSingleProducts,
  addToWishList,
  rateProduct
};
