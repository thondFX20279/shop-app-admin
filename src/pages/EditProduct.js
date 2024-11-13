import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import productApi from "../api/productApi";

const EditProduct = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Lấy dữ liệu sản phẩm để điền trước vào form
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getProductById(id);
        if (response.status === 200) {
          const product = response.data.product;
          setValue("name", product.name);
          setValue("category", product.category);
          setValue("price", product.price);
          setValue("short_desc", product.short_desc);
          setValue("long_desc", product.long_desc);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        alert("Failed to fetch product data");
      }
    };
    fetchProduct();
  }, [id, setValue]);

  // Xử lý cập nhật sản phẩm
  const onSubmit = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("short_desc", data.short_desc);
    formData.append("long_desc", data.long_desc);

    // Append ảnh mới nếu có tải lên
    if (data.image && data.image.length > 0) {
      Array.from(data.image).forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
      const res = await productApi.editProduct(id, formData); // Gọi API cập nhật sản phẩm
      if (res.status === 200) {
        alert("Product updated successfully!");
        navigate("/products"); // Điều hướng về danh sách sản phẩm
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update product.");
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <form className="editProduct_form" onSubmit={handleSubmit(onSubmit)}>
        {/* Tên sản phẩm */}
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

        {/* Danh mục */}
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

        {/* Giá */}
        <div className="form-controls">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter Product price"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && <p className="error">{errors.price.message}</p>}
        </div>

        {/* Mô tả ngắn */}
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

        {/* Mô tả dài */}
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

        {/* Tải ảnh mới */}
        <div className="form-controls">
          <label htmlFor="image">Upload New Images (optional)</label>
          <input type="file" id="image" multiple {...register("image")} />
        </div>

        {/* Nút cập nhật */}
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
