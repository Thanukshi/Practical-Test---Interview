import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../assets/css/newlogin.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [message, setMessage] = useState();
  const [success, IsSuccess] = useState(false);

  const onSubmit = (data) => {
    if (
      data.UserEmail === "admin@gmail.com" &&
      data.UserPassword === "Admin1234"
    ) {
      IsSuccess(true);
      window.location.href = "/navbar";
    } else {
      if (data.UserEmail !== "admin@gmail.com") {
        setMessage("Email is invalid. Pleace check again.");
      } else if (data.UserPassword !== "Admin1234") {
        setMessage("Password is invalid.Pleace check again.");
      }
    }
  };

  return (
    <div className="grid">
      <div className="order__left centered">
        <div className="form">
          <div className="logo">
            <h1 className="mb-4">ABC SCHOOL</h1>
          </div>
          <h4 className="mb-4">
            A learning community dedicated to building respectful and
            responsible citizens and empowering all learners.
          </h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              id="username"
              placeholder="Email"
              autoComplete="off"
              {...register("UserEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address.",
                },
              })}
            />
            {errors.UserEmail && <p>{errors.UserEmail.message}</p>}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              {...register("UserPassword", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message:
                    "Password must be 6 characters long and contain at least one letter and one number.",
                },
              })}
            />
            {errors.UserPassword && <p>{errors.UserPassword.message}</p>}
            <button type="submit" className="login__button">
              Login
            </button>
            {message && <p severity="error">{message}</p>}
            {success && (
              <Stack className="mt-3" sx={{ width: "100%" }} spacing={2}>
                <Alert severity="success">Login Successfully!</Alert>
              </Stack>
            )}
          </form>
        </div>
      </div>
      <div className="order__right centered no__overflow">
        <img
          className="img"
          src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX15583278.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;
