import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Nav from "../../NavBar/Navbar.js";
import axios from "axios";
import { API_URL } from "../../../Data/API.js";
import { toast } from "react-toastify";
import EditButton from "../../../assets/images/edit.png";
import DeleteButton from "../../../assets/images/delete.png";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

function TeacherPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [teachers, GetTeachers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const doc = new jsPDF("landscape");

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
      if (error.response.data.statusCode === 500) {
        setMessage(error.response.data.data);
        toast.success("Deleted", {
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
      }
    }
  };

  const filteredData = teachers.filter((item) => {
    return Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      teachers.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(teachers);
    }
  };

  const downloadReport = () => {
    doc.text("Teacher List", 30, 10);

    let array = [];
    teachers.map((t, index) => {
      let row = [];
      row.push(index + 1);
      row.push(t.firstName + " " + t.lastName);
      row.push(t.contactNo);
      row.push(t.email);
      array.push(row);
      return row;
    });

    doc.autoTable({
      head: [["#", "Teacher Name", "Contact No", "Email"]],

      body: array,
    });

    doc.save("Teacher_Report.pdf");
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
              <div className="col" style={{ width: "100%" }}>
                <h4 className="font-weight-bold mb-2"> Teachers List</h4>
              </div>
              <div className="col ml-5 mr-0" style={{ width: "100%" }}>
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
              <div className="col buttons2  ml-5 mr-0">
                <Link onClick={downloadReport} className="button_pdf">
                  &nbsp;&nbsp;Download Report
                </Link>
                <br />
                <br />
              </div>
            </div>

            {loading ? (
              <div>Loading...</div>
            ) : searchInput.length > 1 ? (
              filteredResults.map((t, index) => {
                return (
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
                    </tbody>
                  </table>
                );
              })
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
