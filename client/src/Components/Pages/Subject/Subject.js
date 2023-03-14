import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Nav from "../../NavBar/Navbar.js";
import axios from "axios";
import { API_URL } from "../../../Data/API.js";
import moment from "moment";

function SubjectPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      const subject = {
        subjectName: data.SubjectName,
        dateCreated: moment().format("DD-MM-YYYY hh:mm:ss"),
      };
      await axios.post(`${API_URL}/Subject/AddSubject`, data).then((res) => {
        setMessage(`${data.SubjectName} is added successfully.`);
      });
    } catch (error) {
      if (error.response.data.statusCode) {
        setMessage(error.response.data.data);
        var today = new Date(),
          date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();

        console.log(date);
      }
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
                <div className="mt-4">
                  <label htmlFor="exampleInputEmail1">Subject Name</label>
                </div>
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

            <div className="row align-items-center mb-3">
              <div className="col-8" style={{ width: "100%" }}>
                <h4 className="font-weight-bold mb-2"> Subjects List</h4>
              </div>
              <div className="col-4" style={{ width: "100%" }}>
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

            <div className="row align-items-center">
              <div className="col">
                <table class="table">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Subject Name</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubjectPage;
