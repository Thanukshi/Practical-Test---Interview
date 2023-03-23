import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Nav from "../../NavBar/Navbar.js";
import axios from "axios";
import { API_URL } from "../../../Data/API.js";
import { Link, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function ClassroomEditPage() {
  const params = useParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [message, setMessage] = useState(null);
  const [classroomName, setClassroomName] = useState([]);
  const [success, IsSuccess] = useState(false);

  const getClassroomByID = async () => {
    try {
      await axios
        .get(`${API_URL}/Classroom/GetClassById/${params.id}`)
        .then((res) => {
          const getData = res.data.data;
          console.log(getData);
          setClassroomName(getData);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  const onSubmit = async (data) => {
    try {
      const upData = {
        classroomId: classroomName.classroomId,
        classroomName: data.classroomName,
      };
      await axios
        .put(`${API_URL}/Classroom/UpdateClassroom`, upData)
        .then((res) => {
          IsSuccess(true);
          window.location.href = "/classroom";
        });
    } catch (error) {
      if (error.response.data.statusCode === 400) {
        setMessage(error.response.data.data);
      }
    }
  };

  useEffect(() => {
    getClassroomByID();
  }, []);

  return (
    <div>
      <Nav></Nav>;
      <div className="container p-1">
        <div className="row align-items-start">
          <div className="col">
            <h2 className="font-weight-bold">Update Classroom Name</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row align-items-center mb-4">
                <div className="mt-4"></div>
                <div className="col mt-1">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Classroom Name"
                      defaultValue={classroomName.classroomName}
                      {...register("classroomName", {
                        required: "Classroom name must be filled.",
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/,
                          message: "Only letters and numbers are allowed",
                        },
                      })}
                    />
                  </div>
                </div>
                {errors.classroomName && <p>{errors.classroomName.message}</p>}
                <div className="row align-items-center mt-2 ml-1 mr-1">
                  <div className="col">
                    <button
                      type="submit"
                      className="btn btn-outline-primary"
                      style={{ width: "100%" }}
                    >
                      Save
                    </button>
                  </div>

                  <div className="col">
                    <Link to={`/classroom`}>
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
              </div>
              {message && <p>{message}</p>}
            </form>
            {success && (
              <Stack className="mt-3" sx={{ width: "100%" }} spacing={2}>
                <Alert severity="success">
                  Classroom Name Updated and Saved Successfully!
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

export default ClassroomEditPage;
