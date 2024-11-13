import axiosClient from "./axiosClient";
const productApi = {
  createProduct: (formData) => {
    const url = "/products";
    return axiosClient.post(url, formData);
  },

  deleteProduct: (id) => {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },

  editProduct: (id, formData) => {
    const url = `/products/${id}`;
    return axiosClient.patch(url, formData);
  },
  getProductById: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
};
export default productApi;
