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

function AllocateSubject() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [teachers, GetTeachers] = useState([]);
  const [subjects, GetSubjects] = useState([]);
  const [allocateSub, GetAllocateSub] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const doc = new jsPDF("portrait");

  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${API_URL}/AllocateSubject/AddAllocateSubject`, data)
        .then((res) => {
          console.log("data", data);
          toast.success(
            `${data.subjectId} is allocated  to ${data.teacherId} successfully.`,
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
          window.location.reload();
        });
    } catch (error) {
      if (error.response.data.statusCode === 400) {
        setMessage(error.response.data.data);
      }
      console.log("data", error);
    }
  };

  const getAllAllocateSubjects = async () => {
    try {
      await axios
        .get(`${API_URL}/AllocateSubject/GetAllocateSubject`)
        .then((res) => {
          console.log("alll", res.data.data);
          GetAllocateSub(res.data.data);
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

  const getAllSubjects = async () => {
    try {
      await axios.get(`${API_URL}/Subject/GetSubjectList`).then((res) => {
        console.log("first", res.data.data);
        GetSubjects(res.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const filteredData = allocateSub.filter((item) => {
    return Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      allocateSub.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(allocateSub);
    }
  };

  const onDelete = async (e, id) => {
    try {
      await axios
        .delete(`${API_URL}/AllocateSubject/RemoveAllAlocateSubject/${id}`)
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

  const downloadReport = () => {
    doc.text("Allocate Subject List", 30, 10);

    let array = [];
    allocateSub.map((al, index) => {
      let row = [];
      row.push(index + 1);
      row.push(al.firstName + " " + al.lastName);
      row.push(al.subjectName);
      array.push(row);
      return row;
    });

    doc.autoTable({
      head: [["#", "Teacher Name", "Subject Name"]],

      body: array,
    });

    doc.save("Allocate_Subject_Report.pdf");
  };

  useEffect(() => {
    getAllTeachers();
    getAllSubjects();
    getAllAllocateSubjects();
  }, []);

  return (
    <div>
      <Nav></Nav>;
      <div className="container p-1">
        <div className="row align-items-start">
          <div className="col">
            <h2 className="font-weight-bold">Allocate Subjects and Teachers</h2>

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
                    <label>Subject</label>
                    <select
                      className="form-control dropdown-toggle"
                      {...register("subjectId", {
                        required: "Subject name must be selected.",
                      })}
                    >
                      <option selected={true} disabled defaultValue="DEFAULT">
                        Select Subject
                      </option>
                      {subjects && subjects.length > 0 ? (
                        subjects.map((item, index) => (
                          <option key={index} value={item.subjectId}>
                            {item.subjectName}
                          </option>
                        ))
                      ) : (
                        <option>No Teacher Found</option>
                      )}
                    </select>

                    {errors.subjectId && <p>{errors.subjectId.message}</p>}
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
                <h4 className="font-weight-bold mb-2">
                  Allocate Subjects List
                </h4>
              </div>
              <div className="col  ml-5 mr-0" style={{ width: "100%" }}>
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
              filteredResults.map((item, index) => {
                return (
                  <div className="row align-items-center">
                    <div className="col">
                      <table className="table">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">No</th>
                            <th scope="col">Teacher Name</th>
                            <th scope="col">Subject Name </th>
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
                            <td>{item.subjectName}</td>
                            <td>
                              <Link
                                to={`/AllocateSubject/Edit/${item.allocateSubjectId}`}
                              >
                                <img src={EditButton} />
                              </Link>
                              <p></p>
                            </td>
                            <td>
                              <p
                                onClick={(e) => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to delete this teacher?"
                                    )
                                  ) {
                                    onDelete(e, item.allocateSubjectId);
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
            ) : allocateSub && allocateSub.length > 0 ? (
              <div className="row align-items-center">
                <div className="col">
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Teacher Name</th>
                        <th scope="col">Subject Name </th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allocateSub.map((item, index) => (
                        <tr key={item.AllocateSubjectId}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {item.firstName} {item.lastName}
                          </td>
                          <td>{item.subjectName}</td>
                          <td>
                            <Link
                              to={`/AllocateSubject/Edit/${item.allocateSubjectId}`}
                            >
                              <img src={EditButton} />
                            </Link>
                            <p></p>
                          </td>
                          <td>
                            <p
                              onClick={(e) => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this teacher?"
                                  )
                                ) {
                                  onDelete(e, item.allocateSubjectId);
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

export default AllocateSubject;
