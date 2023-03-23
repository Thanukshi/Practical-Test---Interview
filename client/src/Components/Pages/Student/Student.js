import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Nav from "../../NavBar/Navbar.js";
import axios from "axios";
import { API_URL } from "../../../Data/API.js";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

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
  const [age, setAge] = useState(null);
  const [classrooms, GetClassrooms] = useState([]);
  const [success, IsSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_URL}/Student/AddStudent`, data).then((res) => {
        console.log("data", data);
        IsSuccess(true);
        window.location.reload();
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
    if (6 > age && 18 < age) {
      setMessage("You are not a valid student.(Age between 6-18) ");
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
  }, []);

  return (
    <div>
      <Nav></Nav>;
      <div className="container p-1">
        <div className="row align-items-start">
          <div className="col">
            <h2 className="font-weight-bold">Add Student</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row align-items-center mt-5 mb-2">
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
                      onBlur={() => {
                        console.log("*****");
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
            {success && (
              <Stack className="mt-3" sx={{ width: "100%" }} spacing={2}>
                <Alert severity="success">Student Added Successfully!</Alert>
              </Stack>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
