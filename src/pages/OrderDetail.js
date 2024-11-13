import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderApi from "../api/orderApi";
import "./OrderDetail.css";

const OrderDetail = () => {

  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await orderApi.getOder(orderId);
        if (res.status === 200) {
          setOrder(res.data.order);
        } else {
          setOrder({});
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      }
    };
    getOrder();
  }, [orderId]);

  return (
    <div className="container">
      <div className="order_info">
        <h2>INFORMATION ORDER</h2>
        <p>ID User: {order?.userId?._id} </p>
        <p>Full name: {order?.userId?.fullName} </p>
        <p>Phone: {order?.phone}</p>
        <p>Address: {order?.address}</p>
        <p>Total: {order?.totalPrice}</p>
      </div>

      <table className="order_table">
        <thead className="order_thead">
          <tr>
            <td>ID Product</td>
            <td>image</td>
            <td>Name</td>
            <td>Price</td>
            <td>Count</td>
          </tr>
        </thead>
        <tbody className="order_tbody">
          {order &&
            order.items?.map((item, i) => (
              <tr key={i}>
                <td>{item?._id}</td>
                <td>
                  <img src={item?.img1} alt="Not Found" />
                </td>
                <td>{item?.name}</td>
                <td>{item?.price}</td>
                <td>{item?.quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;
