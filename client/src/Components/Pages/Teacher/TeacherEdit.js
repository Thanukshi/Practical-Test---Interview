import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Nav from "../../NavBar/Navbar.js";
import axios from "axios";
import { API_URL } from "../../../Data/API.js";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

function TeacherEditPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const params = useParams();

  const [message, setMessage] = useState(null);
  const [teachers, GetTeachers] = useState("");

  useEffect(() => {
    getTeacherBuID();
  }, []);

  const getTeacherBuID = async () => {
    try {
      await axios
        .get(`${API_URL}/Teacher/GetTeacherById/${params.id}`)
        .then((res) => {
          console.log("first", res.data.data);
          GetTeachers(res.data.data);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  const onSubmit = async (data) => {
    try {
      const upData = {
        teacherId: teachers.teacherId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        contactNo: data.contactNo,
      };
      await axios
        .put(`${API_URL}/Teacher/UpdateTeacher`, upData)
        .then((res) => {
          console.log("data", data);
          toast.success(`${data.SubjectName} is added successfully.`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window.location.reload();
        });
    } catch (error) {
      if (error.response.data.statusCode === 400) {
        setMessage(error.response.data.data);
      }
      console.log("data", data);
    }
  };

  return (
    <div>
      <Nav></Nav>;
      <div className="container p-1">
        <div className="row align-items-start">
          <div className="col">
            <h2 className="font-weight-bold mt-2">Update Teacher Details</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row align-items-center mt-4 mb-2">
                <div className="col-6 mt-1">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter First Name"
                      defaultValue={teachers.firstName}
                      {...register("firstName", {
                        required: "First name must be filled.",
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Only letters are allowed",
                        },
                      })}
                    />
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                  </div>
                </div>
                <div className="col-6 mt-1">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Last Name"
                      defaultValue={teachers.lastName}
                      {...register("lastName", {
                        required: "Last name must be filled.",
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Only letters are allowed",
                        },
                      })}
                    />

                    {errors.lastName && <p>{errors.lastName.message}</p>}
                  </div>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-6 ">
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Contact Number"
                      defaultValue={teachers.contactNo}
                      {...register("contactNo", {
                        required: "Contact Number must be filled.",
                        pattern: {
                          value: /^\d{10}$/,
                          message:
                            "Only numbers are allowed and 10 digits only",
                        },
                      })}
                    />
                    {errors.contactNo && <p>{errors.contactNo.message}</p>}
                  </div>
                </div>
                <div className="col-6 ">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Email"
                      defaultValue={teachers.email}
                      {...register("email", {
                        required: "Last name must be filled.",
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Invalid Email Type. Please Check.",
                        },
                      })}
                    />

                    {errors.email && <p>{errors.email.message}</p>}
                  </div>
                </div>
              </div>

              <div className="row align-items-center mt-4">
                <div className="mt-2">
                  <button
                    type="submit"
                    className="btn btn-outline-primary"
                    style={{ width: "100%" }}
                  >
                    Update
                  </button>
                </div>
                <div className="mt-2">
                  <Link to={`/Teacher`}>
                    <button
                      type="submit"
                      className="btn btn-outline-danger"
                      style={{ width: "100%" }}
                    >
                      Cancle
                    </button>
                  </Link>
                </div>
              </div>

              {message && <p className="mt-4">{message}</p>}
            </form>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherEditPage;
