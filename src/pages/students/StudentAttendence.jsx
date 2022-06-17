// System import
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify'
// Custom import
import { server } from "../../utils/variables";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";


function Grades() {
  const [dataClasses, setDataClasses] = useState([]);
  const [dataStudents, setDataStudents] = useState([]);
 

  //GET ALL STUDENTS
  const getAllStudents = () => {
    axios
      .get(server + "/students")
      .then((res) => {        
        setDataStudents(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(server + "/classes")
      .then((res) => {
        setDataClasses(res.data);
      })
      .catch((err) => {
        toast.error("Error: "+err.message )
    });
  };
  useEffect(() => {
    getAllStudents();
  }, []);
  return (
    <div>
      <Header />
      <div className="page my-3">
        <div className="page-title">
          <h1>Take Attendence</h1>
        </div>
        <div className="row">
          <h4>Students</h4>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-light table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>School Number</th>
                  <th>Opr</th>
                </tr>
              </thead>
              <tbody>
                {dataStudents.map((s) => (
                  <tr key={s.id} className="text-center">
                    <td>{s.id}</td>
                    <td>{s.firstName + ' ' + s.lastName}</td>
                    <td>{s.schoolNumber}</td>
                    <td>
                      <Link
                        to={"/add-student-attendence/" + s.id}
                        className="btn btn-sm btn-info text-white"
                      >
                        Take Attendence
                      </Link>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Grades;
