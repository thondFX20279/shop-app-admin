import React, { useState } from "react";
import "./Products.css";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import productApi from "../api/productApi";

const Products = () => {
  const { dispatch } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: { products },
    reFetch,
  } = useFetch(`/products?limit=20`);

  const navigate = useNavigate();
  const deleteProduct = async (productId) => {
    try {
      setIsLoading(true);
      const confirm = window.confirm("Are you sure?");
      if (confirm) {
        const res = await productApi.deleteProduct(productId);
        if (res.status === 200) {
          alert(`Success!. ${res.data.message}`);
          reFetch();
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || error.response?.message;
      const status = error.response?.data?.status || error.response?.status;
      if (status === 403) {
        alert("Login time out. Please Login again");
        dispatch({ type: "LOGOUT" });
      }
      if (status === 400) {
        alert(`Failed!. ${message}`);
      }
      if (status === 500) {
        alert("Internal Sever Error");
      }
      if (status === 404) {
        alert("Page not Found");
      }
    }
    setIsLoading(false);
  };
  const editProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  return (
    <div className="hotels">
      <div className="HotelsList">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Product List</h3>
          <button className="btn" onClick={(e) => navigate("/create-product")}>
            Add new
          </button>
        </div>
        <table className="table">
          <thead className="thead">
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Price</td>
              <td>Image</td>
              <td>Category</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody className="tbody">
            {products &&
              products?.length !== 0 &&
              products.map((product, i) => (
                <tr key={i}>
                  <td>{product?._id}</td>
                  <td>{product?.name}</td>
                  <td>{product?.price}</td>
                  <td>
                    <img src={product?.img1} alt="Not Found" />
                  </td>
                  <td>{product?.category}</td>
                  <td>
                    <div className="hotelActions">
                      <button
                        className="btn delete-btn"
                        disabled={isLoading}
                        onClick={(e) => deleteProduct(product._id)}
                      >
                        Delete
                      </button>
                      <button className="btn edit-btn" onClick={() => editProduct(product._id)}>
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
