import axiosClient from "./axiosClient";
const orderApi = {
  getOrders: () => {
    const url = "/orders";
    return axiosClient.get(url);
  },
  createOrders: (data) => {
    const url = "/orders";
    return axiosClient.post(url, data);
  },
  getOder: (orderId) => {
    const url = `/orders/${orderId}`;
    return axiosClient.get(url);
  },
};
export default orderApi;
