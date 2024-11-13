import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosClient.post("/auth/login", { ...data });
      if (res.status === 200) {
        if (res.data.user.role === "R1") {
          alert("Invalid email or password");
        } else {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
          navigate("/");
        }
      }
    } catch (errs) {
      if (errs.response && errs.response.status === 422) {
        if (errs.response.data.errors) {
          errs.response.data.errors.forEach((err) => {
            setError(err.path, { type: "manual", message: err.msg });
          });
        }
        if (errs.response.data.message) {
          alert(errs.response.data.message);
        } else {
          alert(errors?.message);
        }
      }
    }
    setIsLoading(false);
  };
  return (
    <div className="auth">
      <form action="" className="authForm" onSubmit={handleSubmit(submitHandler)}>
        <h1 className="form-title">Login</h1>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" {...register("email", { required: "Email is required" })} />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>
        <div className="form-control">
          <button className="btn btn-primary" disabled={isLoading} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
