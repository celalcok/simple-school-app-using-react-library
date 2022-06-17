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
 
  const showData = (search) => {
    axios
      .get(server + "/students")
      .then((res) => {
        let data;
        if (search) {
          data = res.data.filter(
            (x) =>
              x.firstName.toLowerCase().includes(search.toLowerCase()) ||
              x.lastName.toLowerCase().includes(search.toLowerCase()) ||
              x.gender.toLowerCase().includes(search.toLowerCase()) ||
              x.schoolNumber.toLowerCase().includes(search.toLowerCase())
          );
        } else {
          data = res.data;
        }
        setDataStudents(data);
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
    showData();
  }, []);
  return (
    <div>
      <Header />
      <div className="page my-3">
        <div className="page-title">
          <h1>Grades</h1>
        </div>
        <div className="row">
       <div className="col-12 d-flex gap-3 pb-3">
            <Link to="/gradetypes" className="btn btn-info text-white">Grade Types</Link>
       </div>
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
                  <th>Name</th>
                  <th>Last Name</th>
                  <th>School Number</th>
                  <th>Gender</th>
                  <th>Opr</th>
                </tr>
              </thead>
              <tbody>
                {dataStudents.map((s) => (
                  <tr key={s.id} className="text-center">
                    <td>{s.id}</td>
                    <td>{s.firstName}</td>
                    <td>{s.lastName}</td>
                    <td>{s.schoolNumber}</td>
                    <td>{s.gender}</td>
                    <td>
                      <Link
                        to={"/add-grade/" + s.id}
                        className="btn btn-sm btn-info text-white"
                      >
                        Add Grade
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
