import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "../../assets/css/login.css";
import Logo from "../../assets/images/logo.png";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [message, setMessage] = useState();
  //let [error, setError] = useState(Error());

  const onSubmit = (data) => {
    if (
      data.UserEmail === "admin@gmail.com" &&
      data.UserPassword === "Admin1234"
    ) {
      window.location.href = "/navbar";
      toast.success("Login Successful", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      let msg;
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
            <img src={Logo} style={{ width: "200px", height: "200px" }} />
          </div>

          <h4>Welcom Admin!</h4>

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
                  message: "Inccorect email address.",
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
            <br />
            <br />
            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
      <div className="order__right centered no__overflow">
        <img
          className="img"
          src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX15583278.jpg"
          alt="picture"
        />
      </div>
    </div>
  );
}

export default LoginPage;
