import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Nav from "../../NavBar/Navbar.js";
import axios from "axios";
import { API_URL } from "../../../Data/API.js";
import { toast } from "react-toastify";
import EditButton from "../../../assets/images/edit.png";
import DeleteButton from "../../../assets/images/delete.png";
import { Link } from "react-router-dom";

function TeacherPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [teachers, GetTeachers] = useState("");

  useEffect(() => {
    getAllTeachers();
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_URL}/Teacher/AddTeacher`, data).then((res) => {
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

  const getAllTeachers = async () => {
    try {
      await axios.get(`${API_URL}/Teacher/GetTeachers`).then((res) => {
        console.log("first", res.data.data);
        GetTeachers(res.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const onDelete = async (e, id) => {
    try {
      await axios
        .delete(`${API_URL}/Teacher/RemoveTeacher/${id}`)
        .then((res) => {
          console.log("res", res);
          toast.success(res.data.data, {
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
      if (error.response.data.statusCode) {
        console.log(error.response.data.data);
      }
    }
  };

  const onUpdate = async (updatedata) => {
    await axios
      .put(`${API_URL}/Subject/UpdateSubject`, updatedata)
      .then((res) => {
        try {
          console.log("up", res);
          toast.success(
            `${updatedata.UpdateSubjectName} is added successfully.`,
            {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        } catch (error) {
          if (error.response.data.statusCode === 400) {
            setMessage(error.response.data.data);
          }
        }
      });
  };

  return (
    <div>
      <Nav></Nav>;
      <div className="container p-1">
        <div className="row align-items-start">
          <div className="col">
            <h2 className="font-weight-bold">Add Teacher</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row align-items-center mb-2">
                <div className="col-6 mt-1">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter First Name"
                      {...register("FirstName", {
                        required: "First name must be filled.",
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Only letters are allowed",
                        },
                      })}
                    />
                    {errors.FirstName && <p>{errors.FirstName.message}</p>}
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
                      {...register("LastName", {
                        required: "Last name must be filled.",
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Only letters are allowed",
                        },
                      })}
                    />

                    {errors.LastName && <p>{errors.LastName.message}</p>}
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
                      {...register("Email", {
                        required: "Last name must be filled.",
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Invalid Email Type. Please Check.",
                        },
                      })}
                    />

                    {errors.LastName && <p>{errors.LastName.message}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  style={{ width: "100%" }}
                >
                  Save
                </button>
              </div>

              {message && <p className="mt-4">{message}</p>}
            </form>
            <br />
            <br />

            <div className="row align-items-center mt-5 mb-4">
              <div className="col-6" style={{ width: "100%" }}>
                <h4 className="font-weight-bold mb-2"> Teachers List</h4>
              </div>
              <div className="col-6" style={{ width: "100%" }}>
                <form className="form-inline my-2 my-lg-0">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-primary my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>

            {loading ? (
              <div>Loading...</div>
            ) : teachers && teachers.length > 0 ? (
              <div className="row align-items-center">
                <div className="col">
                  <table class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.map((t, index) => (
                        <tr key={t.teacherId}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {t.firstName} {t.lastName}
                          </td>
                          <td>{t.contactNo}</td>
                          <td>{t.email} </td>
                          <td>
                            <p>
                              <Link to={`/Teacher/Edit/${t.teacherId}`}>
                                <img src={EditButton} />
                              </Link>
                            </p>
                          </td>
                          <td>
                            <p
                              onClick={(e) => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this teacher?"
                                  )
                                ) {
                                  onDelete(e, t.teacherId);
                                }
                              }}
                            >
                              <img src={DeleteButton} />
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                Teachers List is not found at this moment. Please try again
                later.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherPage;
