import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import Nav from "../../NavBar/Navbar.js";
import axios from "axios";
import { API_URL } from "../../../Data/API.js";
import { toast } from "react-toastify";
import EditButton from "../../../assets/images/edit.png";
import DeleteButton from "../../../assets/images/delete.png";

function StudentPage() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [students, GetStudents] = useState("");
  const [student, SetStudent] = useState("");
  const [age, setAge] = useState(null);
  const [classrooms, GetClassrooms] = useState("");

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_URL}/Student/AddStudent`, data).then((res) => {
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

  const getAllStudents = async () => {
    try {
      await axios.get(`${API_URL}/Student/GetStudent`).then((res) => {
        console.log("first", res.data.data);
        GetStudents(res.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const onDelete = async (e, id) => {
    try {
      await axios
        .delete(`${API_URL}/Student/RemoveStudent/${id}`)
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
      .put(`${API_URL}/Student/UpdateStudent`, updatedata)
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

  const getAge = async () => {
    var today = new Date();
    console.log("today", today);
    const dbo = watch("dbo");
    var birthDate = new Date(dbo);

    console.log("dbo", dbo);
    console.log("birthDate", birthDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log("age", age);
    if (6 > age && 18 < age) {
      setAge("You are not a valid student.(Age between 6-18) ");
    } else {
      setAge(age);
    }
    setAge(age);
    return age;
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

  useEffect(() => {
    getAllStudents();
    getAllClassroom();
  }, []);

  return (
    <div>
      <Nav></Nav>;
      <div className="container p-1">
        <div className="row align-items-start">
          <div className="col">
            <h2 className="font-weight-bold">Add Student</h2>

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
                    <label>Contact Person</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Contact Person Name"
                      {...register("contactPersonName", {
                        required: "Contact Person Name must be filled.",
                        pattern: {
                          value: /^[a-zA-Z\s]*$/,
                          message: "Only letters are allowed",
                        },
                      })}
                    />
                    {errors.contactPersonName && (
                      <p>{errors.contactPersonName.message}</p>
                    )}
                  </div>
                </div>
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
              </div>

              <div className="row align-items-center mb-2">
                <div className="col-6">
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
                <div className="col-6">
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
                    {errors.Email && <p>{errors.Email.message}</p>}
                  </div>
                </div>
              </div>

              <div className="row align-items-center mb-2">
                <div className="col-6">
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Contact Person Name"
                      {...register("dbo", {
                        required: "Date of birth must be filled.",
                      })}
                      onClick={() => {
                        getAge();
                      }}
                    />
                  </div>

                  {errors.dbo && <p>{errors.dbo.message}</p>}
                </div>
                <div className="col-6 ">
                  <div className="form-group">
                    <label>Age</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={age}
                      readOnly
                      {...register("age", {
                        required: "Age must be filled.",
                      })}
                    />

                    {errors.age && <p>{errors.age.message}</p>}
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
            ) : student && student.length > 0 ? (
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
                      {student.map((s, index) => (
                        <tr key={s.teacherId}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {s.firstName} {s.lastName}
                          </td>
                          <td>{s.contactNo}</td>
                          <td>{s.email} </td>
                          <td>
                            <p>
                              <img src={EditButton} />
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
                                  onDelete(e, s.teacherId);
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
                <br />
                <br />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
