import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Nav from "../../NavBar/Navbar.js";
import axios from "axios";
import { API_URL } from "../../../Data/API.js";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

function AllocateClassroomEdit() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [message, setMessage] = useState(null);
  const [teachers, GetTeachers] = useState([]);
  const [classrooms, GetClassrooms] = useState([]);
  const [allocateClass, GetAllocateClass] = useState({
    allocateClassroomID: "",
    classroomID: "",
    classroomName: "",
    firstName: "",
    lastName: "",
    teacherID: "",
  });

  const params = useParams();

  const onSubmit = async (data) => {
    try {
      const upData = {
        allocateClassroomId: allocateClass.allocateClassroomId,
        teacherId: data.teacherId,
        classroomId: data.classroomId,
      };
      await axios
        .put(`${API_URL}/AllocateClassroom/UpdateAllocateClassroom`, upData)
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

  const getAllocateClassroomByID = async () => {
    try {
      await axios
        .get(
          `${API_URL}/AllocateClassroom/GetAllocateClassroomByID/${params.id}`
        )
        .then((res) => {
          const getData = res.data.data;
          GetAllocateClass(getData);

          console.log("dddaa", res.data.data);
          console.log("ddd", allocateClass);
        });
    } catch (error) {
      if (error.data.status === 400) {
        console.log(error.response);
      }
    }
  };

  const getAllTeachers = async () => {
    try {
      await axios.get(`${API_URL}/Teacher/GetTeachers`).then((res) => {
        console.log("first", res.data.data);
        GetTeachers(res.data.data);
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
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllTeachers();
    getAllClassroom();
    getAllocateClassroomByID();
  }, []);

  return (
    <div>
      <Nav></Nav>;
      <div className="container p-1">
        <div className="row align-items-start">
          <div className="col">
            <h2 className="font-weight-bold mt-4">
              Update Allocate Classroom and Teachers
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row align-items-center mt-4 mb-2">
                <div className="col-6 mt-1">
                  <div className="form-group">
                    <label>Teacher Name</label>
                    <select
                      className="form-control dropdown-toggle"
                      defaultValue={allocateClass.firstName}
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
                      defaultValue={allocateClass.classroomName}
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

              {message && <p className="mt-2">{message}</p>}
              <div className="mt-4">
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  style={{ width: "100%" }}
                >
                  Save
                </button>
                <Link to={`/AllocateClassroom`}>
                  <div className="mt-2">
                    <button
                      type="submit"
                      className="btn btn-outline-danger"
                      style={{ width: "100%" }}
                    >
                      Cancel
                    </button>
                  </div>
                </Link>
              </div>
            </form>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllocateClassroomEdit;
