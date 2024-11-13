import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faShoppingCart, faDollarSign } from "@fortawesome/free-solid-svg-icons"; // Import các icon cần thiết
import { useNavigate } from "react-router-dom";
import "./Home.css";
import useFetch from "../hooks/useFetch";
const Home = () => {
  const navigate = useNavigate();

  const { data } = useFetch("/orders?limit=8&isAdmin=true");

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };
  return (
    <div className="home">
      <div className="profit">
        <div className="profitItem">
          <h4 className="title">USERS</h4>
          <p className="number">{data.totalUser}</p>
          <div className="icon">
            <FontAwesomeIcon icon={faUsers} style={{ backgroundColor: "rgb(255,204,204)", color: "rgb(231,76,103)" }} />
          </div>
        </div>

        <div className="profitItem">
          <h4 className="title">EARNINGS Of Month</h4>
          <p className="number">VND {numberWithCommas(data?.totalRevenue || 0)}</p>
          <div className="icon">
            <FontAwesomeIcon
              icon={faDollarSign}
              style={{ backgroundColor: "rgb(255,204,204)", color: "rgb(231,76,103)" }}
            />
          </div>
        </div>
        <div className="profitItem">
          <h4 className="title">ORDERS</h4>
          <p className="number">{data?.orders?.length}</p>
          <div className="icon">
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ backgroundColor: "rgb(255,204,204)", color: "rgb(231,76,103)" }}
            />
          </div>
        </div>
      </div>
      <div className="latestOrders">
        <h3>History</h3>
        <table className="table">
          <thead className="thead">
            <tr>
              <td>ID User</td>
              <td>Name</td>
              <td>Phone</td>
              <td>Address</td>
              <td>Total</td>
              <td>Status</td>
              <td>Detail</td>
            </tr>
          </thead>
          <tbody className="tbody">
            {data?.orders &&
              data.orders.map((order, i) => (
                <tr key={i}>
                  <td>{order?.userId?._id}</td>
                  <td>{order?.userId?.fullName}</td>
                  <td>{order?.phone}</td>
                  <td>{order?.address}</td>
                  <td>{order?.totalPrice}</td>
                  <td>Waiting for pay</td>
                  <td>
                    <button className="order_actions" onClick={(e) => handleClick(order._id)}>
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
