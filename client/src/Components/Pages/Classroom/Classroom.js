import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Nav from "../../NavBar/Navbar.js";
import axios from "axios";
import { API_URL } from "../../../Data/API.js";
import { toast } from "react-toastify";
import EditButton from "../../../assets/images/edit.png";
import DeleteButton from "../../../assets/images/delete.png";
import { Link } from "react-router-dom";

function ClassroomPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [classroom, GetClassroom] = useState("");

  useEffect(() => {
    getAllClassrooms();
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_URL}/Classroom/AddClass`, data).then((res) => {
        toast.success(`${data.ClassroomName} is added successfully.`, {
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
    }
  };

  const getAllClassrooms = async () => {
    try {
      await axios.get(`${API_URL}/Classroom/GetClasses`).then((res) => {
        GetClassroom(res.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const onDelete = async (e, id) => {
    try {
      await axios
        .delete(`${API_URL}/Classroom/RemoveClassroom/${id}`)
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
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  return (
    <div>
      <Nav></Nav>;
      <div className="container p-1">
        <div className="row align-items-start">
          <div className="col">
            <h2 className="font-weight-bold">Add Classroom</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row align-items-center mb-5">
                <div className="mt-4"></div>
                <div className="col-8 mt-1">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Classroom Name"
                      {...register("ClassroomName", {
                        required: "Classroom name must be filled.",
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/,
                          message: "Only letters and numbers are allowed",
                        },
                      })}
                    />
                  </div>
                </div>
                <div className="col-4 mt-1">
                  <button
                    type="submit"
                    className="btn btn-outline-primary"
                    style={{ width: "100%" }}
                  >
                    Save
                  </button>
                </div>

                {errors.ClassroomName && <p>{errors.ClassroomName.message}</p>}
                {message && <p>{message}</p>}
              </div>
            </form>
            <br />
            <br />

            <div className="row align-items-center mb-3">
              <div className="col-6" style={{ width: "100%" }}>
                <h4 className="font-weight-bold mb-2"> Classroom List</h4>
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
            ) : classroom && classroom.length > 0 ? (
              <div className="row align-items-center">
                <div className="col">
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Classroom Name</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classroom.map((item, index) => (
                        <tr key={item.classroomId}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.classroomName}</td>
                          <td>
                            <p>
                              <Link to={`/classroom/edit/${item.classroomId}`}>
                                <img src={EditButton} />
                              </Link>
                            </p>
                          </td>
                          <td>
                            <p
                              onClick={(e) => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this subject?"
                                  )
                                ) {
                                  onDelete(e, item.classroomId);
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
                Classroom List is not found at this moment. Please try again
                later.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassroomPage;
