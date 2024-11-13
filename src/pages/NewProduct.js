import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./NewProduct.css";
import productApi from "../api/productApi";
import { useNavigate } from "react-router-dom";
const NewProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("short_desc", data.short_desc);
    formData.append("long_desc", data.long_desc);
    if (data.image && data.image.length > 0) {
      Array.from(data.image).forEach((image) => {
        formData.append("images", image);
      });
    }
    try {
      const res = await productApi.createProduct(formData);
      if (res.status === 201) {
        navigate("/products");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <div>
      <form className="newProduct_form" onSubmit={handleSubmit(onSubmit)}>
        {/* Product Name */}
        <div className="form-controls">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Product name"
            {...register("name", { required: "Product name is required" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        {/* Category */}
        <div className="form-controls">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            placeholder="Enter Product category"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && <p className="error">{errors.category.message}</p>}
        </div>
        {/* price */}
        <div className="form-controls">
          <label htmlFor="price">Price</label>
          <input
            type="Number"
            id="price"
            placeholder="Enter Product price"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && <p className="error">{errors.price.message}</p>}
        </div>

        {/* Short Description */}
        <div className="form-controls">
          <label htmlFor="short_desc">Short Description</label>
          <textarea
            id="short_desc"
            rows={4}
            placeholder="Enter short description"
            {...register("short_desc", { required: "Short description is required" })}
          />
          {errors.short_desc && <p className="error">{errors.short_desc.message}</p>}
        </div>

        {/* Long Description */}
        <div className="form-controls">
          <label htmlFor="long_desc">Long Description</label>
          <textarea
            id="long_desc"
            rows={4}
            placeholder="Enter long description"
            {...register("long_desc", { required: "Long description is required" })}
          />
          {errors.long_desc && <p className="error">{errors.long_desc.message}</p>}
        </div>

        {/* Upload Images */}
        <div className="form-controls">
          <label htmlFor="image">Upload Image (5 images)</label>
          <input
            type="file"
            id="image"
            multiple
            {...register("image", { required: "Please upload at least one image" })}
          />
          {errors.image && <p className="error">{errors.image.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isLoading} className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
