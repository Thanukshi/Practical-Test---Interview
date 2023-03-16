import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Nav from "../../NavBar/Navbar.js";
import axios from "axios";
import { API_URL } from "../../../Data/API.js";
import { toast } from "react-toastify";

function SubjectEditPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [message, setMessage] = useState(null);
  const [subject, setSubject] = useState("");

  const params = useParams();

  const getAllSubjectByID = async () => {
    try {
      await axios
        .get(`${API_URL}/Subject/GetSubjectById/${params.id}`)
        .then((res) => {
          const getData = res.data.data;
          console.log(getData);
          setSubject(getData);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllSubjectByID();
  }, []);

  const onSubmit = async (data) => {
    try {
      const upData = {
        subjectId: subject.subjectId,
        subjectName: data.subjectName,
      };
      await axios
        .put(`${API_URL}/Subject/UpdateSubject`, upData)
        .then((res) => {
          toast.success(`Subjecti is updated successfully.`, {
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

  return (
    <div>
      <Nav></Nav>;
      <div className="container p-1">
        <div className="row align-items-start">
          <div className="col">
            <h2 className="font-weight-bold mb-4">Update Subject Name</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row align-items-center mb-4">
                <div className="col">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Subject Name"
                      name="subjectName"
                      defaultValue={subject.subjectName}
                      {...register("subjectName", {
                        required: "Subject name must be filled.",
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Only letters are allowed",
                        },
                      })}
                    />
                  </div>
                </div>

                {errors.SubjectName && <p>{errors.SubjectName.message}</p>}
              </div>
              <div className="row align-items-center mb-5">
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
                  <Link to={`/subject`}>
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
              {message && <p>{message}</p>}
            </form>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubjectEditPage;
