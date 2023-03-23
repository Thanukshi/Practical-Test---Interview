import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../../NavBar/Navbar.js";
import axios from "axios";
import { API_URL } from "../../../Data/API.js";
import { toast } from "react-toastify";
import EditButton from "../../../assets/images/edit.png";
import DeleteButton from "../../../assets/images/delete.png";
import jsPDF from "jspdf";
import "jspdf-autotable";

function StudentList() {
  const [loading, setLoading] = useState(false);
  const [students, GetStudents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const doc = new jsPDF("landscape");

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
      console.log("id", id);
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

  const filteredData = students.filter((item) => {
    return Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      students.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(students);
    }
  };

  const downloadReport = () => {
    doc.text("Student List", 30, 10);

    let array = [];
    students.map((st, index) => {
      let row = [];
      row.push(index + 1);
      row.push(st.firstName + " " + st.lastName);
      row.push(st.contactPersonName);
      row.push(st.contactNo);
      row.push(st.email);
      row.push(st.classroomName);
      row.push(st.dbo);
      row.push(st.age);
      array.push(row);
      return row;
    });

    doc.autoTable({
      head: [
        [
          "#",
          "Student Name",
          "Contact Person",
          "Contact Number",
          "Email",
          "Classroom",
          "Date of Birth",
          "Age",
        ],
      ],

      body: array,
    });

    doc.save("Student_Report.pdf");
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <div>
      <Nav></Nav>;
      <div className="container p-0 mt-4">
        <div className="row align-items-start">
          <div className="col-7">
            <h2 className="font-weight-bold">Student List</h2>
          </div>
          <div className="col" style={{ width: "100%" }}>
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
              <table class="table" style={{ width: "100%" }}>
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact Person</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Classroom</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Age</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={item.studentId}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {item.firstName} {item.lastName}
                    </td>
                    <td>{item.contactPersonName}</td>
                    <td>{item.contactNo}</td>
                    <td>{item.email} </td>
                    <td>{item.classroomName} </td>
                    <td>{item.dbo} </td>
                    <td>{item.age} </td>
                    <td>
                      <p>
                        <Link to={`/Student/Edit/${item.studentID}`}>
                          <img src={EditButton} alt="" />
                        </Link>
                      </p>
                    </td>
                    <td>
                      <p
                        onClick={(e) => {
                          if (
                            window.confirm(
                              `Are you sure you want to delete this ${item.firstName} ${item.lastName} student?`
                            )
                          ) {
                            onDelete(e, item.studentID);
                          }
                        }}
                      >
                        <img src={DeleteButton} alt=""/>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })
        ) : students && students.length > 0 ? (
          <div className="row align-items-center mt-5 ">
            <div className="col">
              <table class="table" style={{ width: "100%" }}>
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact Person</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Classroom</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Age</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((item, index) => (
                    <tr key={item.studentId}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {item.firstName} {item.lastName}
                      </td>
                      <td>{item.contactPersonName}</td>
                      <td>{item.contactNo}</td>
                      <td>{item.email} </td>
                      <td>{item.classroomName} </td>
                      <td>{item.dbo} </td>
                      <td>{item.age} </td>
                      <td>
                        <p>
                          <Link to={`/Student/Edit/${item.studentID}`}>
                            <img src={EditButton} alt=""/>
                          </Link>
                        </p>
                      </td>
                      <td>
                        <p
                          onClick={(e) => {
                            if (
                              window.confirm(
                                `Are you sure you want to delete this ${item.firstName} ${item.lastName} student?`
                              )
                            ) {
                              onDelete(e, item.studentID);
                            }
                          }}
                        >
                          <img src={DeleteButton} alt=""/>
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="not_found mt-4">
            Student List is not found at this moment. Please try again later.
            <br />
            <br />
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentList;
