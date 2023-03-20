import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Nav from "../../NavBar/Navbar.js";
import axios from "axios";
import { API_URL } from "../../../Data/API.js";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

function AllocateSubjectEdit() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [message, setMessage] = useState(null);
  const [teachers, GetTeachers] = useState([]);
  const [subjects, GetSubjects] = useState([]);
  const [allocateSub, GetAllocateSub] = useState({
    allocateSubjectId: "",
    firstName: "",
    lastName: "",
    subjectID: "",
    subjectName: "",
    teacherID: "",
  });

  const params = useParams();

  const onSubmit = async (data) => {
    try {
      const upData = {
        allocateSubjectId: allocateSub.allocateSubjectId,
        subjectId: data.subjectId,
        teacherId: data.teacherId,
      };
      await axios
        .put(`${API_URL}/AllocateSubject/UpdateAllocateSubject`, upData)
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

  const getAllocateSubjectByID = async () => {
    try {
      await axios
        .get(`${API_URL}/AllocateSubject/GetAllocateSubjectByID/${params.id}`)
        .then((res) => {
          console.log("alll", res.data.data);
          const getData = res.data.data;
          GetAllocateSub(getData);

          console.log("alll", allocateSub);
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
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  console.log("sdf", allocateSub.subjectName);
  useEffect(() => {
    getAllTeachers();
    getAllSubjects();
    getAllocateSubjectByID();
  }, []);

  return (
    <div>
      <Nav></Nav>;
      <div className="container p-1">
        <div className="row align-items-start">
          <div className="col">
            <h2 className="font-weight-bold mt-4">
              Update Allocate Subjects and Teachers
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row align-items-center mt-5 mb-2">
                <div className="col-6 mt-1">
                  <div className="form-group">
                    <label>Teacher Name</label>
                    <select
                      className="form-control dropdown-toggle"
                      defaultValue={allocateSub.firstName}
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
                      defaultValue={allocateSub.subjectName}
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

              {message && <p className="mt-4">{message}</p>}

              <div className="mt-4">
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  style={{ width: "100%" }}
                >
                  Save
                </button>
              </div>

              <div className="mt-2">
                <Link to={`/AllocateSubject`}>
                  <button
                    type="submit"
                    className="btn btn-outline-danger"
                    style={{ width: "100%" }}
                  >
                    Cancle{" "}
                  </button>
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

export default AllocateSubjectEdit;
