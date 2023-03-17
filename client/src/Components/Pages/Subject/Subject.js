import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Nav from "../../NavBar/Navbar.js";
import axios from "axios";
import { API_URL } from "../../../Data/API.js";
import { toast } from "react-toastify";
import EditButton from "../../../assets/images/edit.png";
import DeleteButton from "../../../assets/images/delete.png";

function SubjectPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subjects, GetSubjects] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    getAllSubjects();
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_URL}/Subject/AddSubject`, data).then((res) => {
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

  const onDelete = async (e, id) => {
    try {
      await axios
        .delete(`${API_URL}/Subject/RemoveSubject/${id}`)
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

  const filteredData = subjects.filter((item) => {
    return Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      subjects.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(subjects);
    }
  };

  return (
    <div>
      <Nav></Nav>;
      <div className="container p-1">
        <div className="row align-items-start">
          <div className="col">
            <h2 className="font-weight-bold">Add Subjects</h2>

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
                      placeholder="Enter Subject Name"
                      {...register("SubjectName", {
                        required: "Subject name must be filled.",
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Only letters are allowed",
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

                {errors.SubjectName && <p>{errors.SubjectName.message}</p>}
                {message && <p>{message}</p>}
              </div>
            </form>
            <br />
            <br />

            <div className="row  mb-3">
              <div className="col-6" style={{ width: "100%" }}>
                <h4 className="font-weight-bold mb-2"> Subjects List</h4>
              </div>
              <div className="col ml-5 mr-0">
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
              filteredResults.map((sub, index) => {
                return (
                  <table class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Subject Name</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={sub.subjectId}>
                        <th scope="row">{index + 1}</th>
                        <td>{sub.subjectName}</td>
                        <td>
                          <p>
                            <Link to={`/Subject/Edit/${sub.subjectId}`}>
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
                                onDelete(e, sub.subjectId);
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
            ) : subjects && subjects.length > 0 ? (
              <div className="row align-items-center">
                <div className="col">
                  <table class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Subject Name</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((sub, index) => (
                        <tr key={sub.subjectId}>
                          <th scope="row">{index + 1}</th>
                          <td>{sub.subjectName}</td>
                          <td>
                            <p>
                              <Link to={`/Subject/Edit/${sub.subjectId}`}>
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
                                  onDelete(e, sub.subjectId);
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
                Subject List is not found at this moment. Please try again
                later.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubjectPage;
