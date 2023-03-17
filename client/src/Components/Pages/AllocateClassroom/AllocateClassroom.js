import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Nav from "../../NavBar/Navbar.js";
import axios from "axios";
import { API_URL } from "../../../Data/API.js";
import { toast } from "react-toastify";
import EditButton from "../../../assets/images/edit.png";
import DeleteButton from "../../../assets/images/delete.png";
import { Link } from "react-router-dom";

function AllocateClassroom() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [teachers, GetTeachers] = useState([]);
  const [classrooms, GetClassrooms] = useState([]);
  const [allocateClass, GetAllocateClass] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${API_URL}/AllocateClassroom/AddAllocateClassroom`, data)
        .then((res) => {
          console.log("data", data);
          toast.success(`Successfully.`, {
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
      console.log("data", error);
    }
  };

  const getAllAllocateClassroom = async () => {
    try {
      await axios
        .get(`${API_URL}/AllocateClassroom/GetAllAllocateClassroomDetails`)
        .then((res) => {
          console.log("alll", res.data.data);
          GetAllocateClass(res.data.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error.response);
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

  const getAllClassroom = async () => {
    try {
      await axios.get(`${API_URL}/Classroom/GetClasses`).then((res) => {
        console.log("first", res.data.data);
        GetClassrooms(res.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const onDelete = async (e, id) => {
    try {
      await axios
        .delete(`${API_URL}/AllocateClassroom/RemoveAllAlocateClassroom/${id}`)
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

  const filteredData = allocateClass.filter((item) => {
    return Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      allocateClass.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(allocateClass);
    }
  };

  useEffect(() => {
    getAllTeachers();
    getAllClassroom();
    getAllAllocateClassroom();
  }, []);

  return (
    <div>
      <Nav></Nav>;
      <div className="container p-1">
        <div className="row align-items-start">
          <div className="col">
            <h2 className="font-weight-bold">
              Allocate Classroom and Teachers
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row align-items-center mb-2">
                <div className="col-6 mt-1">
                  <div className="form-group">
                    <label>Teacher Name</label>
                    <select
                      className="form-control dropdown-toggle"
                      {...register("teacherId", {
                        required: "Teacher name must be selected.",
                      })}
                    >
                      <option selected={true} disabled defaultValue="DEFAULT">
                        Select Teacher
                      </option>
                      {teachers && teachers.length > 0 ? (
                        teachers.map((item, index) => (
                          <option key={index} value={item.teacherId}>
                            {item.firstName} {item.lastName}
                          </option>
                        ))
                      ) : (
                        <option>No Teacher Found</option>
                      )}
                    </select>
                    {errors.teacherId && <p>{errors.teacherId.message}</p>}
                  </div>
                </div>
                <div className="col-6 mt-1">
                  <div className="form-group">
                    <label>Classroom</label>
                    <select
                      className="form-control dropdown-toggle"
                      {...register("classroomId", {
                        required: "Classroom must be selected.",
                      })}
                    >
                      <option selected={true} disabled defaultValue="DEFAULT">
                        Select Classroom
                      </option>
                      {classrooms && classrooms.length > 0 ? (
                        classrooms.map((item, index) => (
                          <option key={index} value={item.classroomId}>
                            {item.classroomName}
                          </option>
                        ))
                      ) : (
                        <option>No Classroom Found</option>
                      )}
                    </select>

                    {errors.classroomId && <p>{errors.classroomId.message}</p>}
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
                <h4 className="font-weight-bold mb-2">
                  Allocate Classrooms List
                </h4>
              </div>
              <div className="col-6" style={{ width: "100%" }}>
                <form className="form-inline my-2 my-lg-0">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search..."
                    style={{ width: "110%", border: "rounded-5" }}
                    aria-label="Search"
                    onChange={(e) => searchItems(e.target.value)}
                  />
                </form>
              </div>
            </div>

            {loading ? (
              <div>Loading...</div>
            ) : searchInput.length > 1 ? (
              filteredResults.map((item, index) => {
                return (
                  <div className="row align-items-center">
                    <div className="col">
                      <table className="table">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">No</th>
                            <th scope="col">Teacher Name</th>
                            <th scope="col">Classroom Name </th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={item.AllocateSubjectId}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              {item.firstName} {item.lastName}
                            </td>
                            <td>{item.classroomName}</td>
                            <td>
                              <p>
                                <Link
                                  to={`/AllocateClassroom/Edit/${item.allocateClassroomID}`}
                                >
                                  <img src={EditButton} />
                                </Link>
                              </p>
                            </td>
                            <td>
                              <p
                                onClick={(e) => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to delete this allocate classroom?"
                                    )
                                  ) {
                                    onDelete(e, item.allocateClassroomID);
                                  }
                                }}
                              >
                                <img src={DeleteButton} />
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })
            ) : allocateClass && allocateClass.length > 0 ? (
              <div className="row align-items-center">
                <div className="col">
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Teacher Name</th>
                        <th scope="col">Classroom Name </th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allocateClass.map((item, index) => (
                        <tr key={item.AllocateSubjectId}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {item.firstName} {item.lastName}
                          </td>
                          <td>{item.classroomName}</td>
                          <td>
                            <p>
                              <Link
                                to={`/AllocateClassroom/Edit/${item.allocateClassroomID}`}
                              >
                                <img src={EditButton} />
                              </Link>
                            </p>
                          </td>
                          <td>
                            <p
                              onClick={(e) => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this allocate classroom?"
                                  )
                                ) {
                                  onDelete(e, item.allocateClassroomID);
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
                Allocated Subjects List is not found at this moment. Please try
                again later.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllocateClassroom;
