import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const postQuery = async (contactData) => {
  const response = await axios.post(`${base_url}enquary`,contactData, config);
  if (response.data) {
    return response.data;
  }
};



export const contactService = {
    postQuery,
};
