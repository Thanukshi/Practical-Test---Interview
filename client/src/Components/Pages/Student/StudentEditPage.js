import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Nav from "../../NavBar/Navbar.js";
import axios from "axios";
import { API_URL } from "../../../Data/API.js";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function StudentEditPage() {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const params = useParams();

  const [message, setMessage] = useState(null);
  const [ages, setAge] = useState(null);
  const [classrooms, GetClassrooms] = useState([]);
  const [success, IsSuccess] = useState(false);
  const [student, SetStudent] = useState({
    age: "",
    classroomID: "",
    classroomName: "",
    contactNo: "",
    contactPersonName: "",
    dbo: "",
    email: "",
    firstName: "",
    lastName: "",
    studentID: "",
  });

  const getAllStudentByID = async () => {
    try {
      await axios
        .get(`${API_URL}/Student/GetStudentById/${params.id}`)
        .then((res) => {
          const getData = res.data.data;
          SetStudent(getData);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  console.log("student.studentID", student.studentID);
  const onSubmit = async (data) => {
    try {
      const upData = {
        email: data.email,
        age: data.age,
        classroomId: data.classroomId,
        contactNo: data.contactNo,
        contactPersonName: data.contactPersonName,
        dbo: data.dbo,
        firstName: data.firstName,
        lastName: data.lastName,
        studentID: student.studentID,
      };

      console.log("upData", upData);
      await axios
        .put(`${API_URL}/Student/UpdateStudent`, upData)
        .then((res) => {
          console.log("data", data);
          IsSuccess(true);
          window.location.href = "/Student/List";
        });
    } catch (error) {
      if (error.response.data.statusCode === 400) {
        setMessage(error.response.data.data);
      }
      console.log("data", data);
    }
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
      setValue("age", age);
    }
    setAge(age);
    return age;
  };

  const getAllClassroom = async () => {
    try {
      await axios.get(`${API_URL}/Classroom/GetClasses`).then((res) => {
        const getData = res.data.data.sort((a, b) =>
          a.classroomName > b.classroomName ? 1 : -1
        );
        GetClassrooms(getData);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllClassroom();
    getAllStudentByID();
  }, []);

  console.log("stud", student);

  return (
    <div>
      <Nav></Nav>;
      <div className="container p-1">
        <div className="row align-items-start">
          <div className="col">
            <h2 className="font-weight-bold">Update Student</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row align-items-center mt-4 mb-2">
                <div className="col-6 mt-1">
                  <div className="form-group">
                    <input type="text" hidden {...register("StudentID")} />

                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter First Name"
                      name="firstName"
                      defaultValue={student.firstName}
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
                      defaultValue={student.lastName}
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
                      defaultValue={student.contactPersonName}
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
                      defaultValue={student.contactNo}
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
                      defaultValue={student.classroomName}
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
                      defaultValue={student.email}
                      placeholder="Enter Email"
                      {...register("email", {
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
                      defaultValue={student.dbo}
                      {...register("dbo", {
                        required: "Date of birth must be filled.",
                      })}
                      onBlur={() => {
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
                      defaultValue={student.age}
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

              <Link to={"/Student/List"}>
                <div className="mt-2">
                  <button
                    type="submit"
                    className="btn btn-outline-danger"
                    style={{ width: "100%" }}
                  >
                    Cancle
                  </button>
                </div>
              </Link>

              {message && <p className="mt-4">{message}</p>}
            </form>
            {success && (
              <Stack className="mt-3" sx={{ width: "100%" }} spacing={2}>
                <Alert severity="success">
                  Student Details Updated and Savrd Successfully!
                </Alert>
              </Stack>
            )}
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentEditPage;
