// System import
import React, { useState, useEffect } from "react";
import {useParams, Link} from "react-router-dom"
import axios from "axios";
// Custom import
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import {server} from "../../utils/variables"
import defaultProfileMan from "../../images/defaultprofile.jpg"
import defaultProfileWoman from "../../images/defaultprofilewoman.png"

function StutentDetails() {
  const [dataStudent, setDataStudent] = useState({});
  const {id} = useParams();
  
  //GET ALL STUDENTS
  const getStudents =() =>{
    axios.get(server+"/students/"+id)
    .then((res) => {
      console.log(res.data);
      setDataStudent(res.data);
      console.log(dataStudent);
    })
  }
  useEffect(() => {
    getStudents();
  },[])
  return (
    <div>
      <Header />
      <div className="page py-3">
        <div className="row">
          <div className="col-md-12 page-title mb-3">
            <h1> <span className="text-muted">Details For </span>{dataStudent.firstName + " " + dataStudent.lastName} </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6">
            <img 
              style={{ height: "300px" }}
              src={dataStudent.photo?dataStudent.photo:dataStudent.gender=="Male" ?defaultProfileMan:defaultProfileWoman}
              alt="" />
          </div>
          <div className="col-12 col-sm-6">
            <h4 className="text-info">
              <span  className="text-muted"> Full Name: </span>
              {dataStudent.firstName + " " + dataStudent.lastName}
            </h4>
            <p><span className="text-muted">Class ID:</span> {dataStudent.classID}</p>
            <p><span className="text-muted">Birth Date:</span> {dataStudent.birthDate}</p>
            <p><span className="text-muted">School Number:</span> {dataStudent.schoolNumber}</p>
            <p><span className="text-muted">Gender:</span> {dataStudent.gender}</p>
            <p><span className="text-muted">Address:</span> {dataStudent.address}</p>
            <p><span className="text-muted">Phone:</span> {dataStudent.phoneNumber}</p>
            <p><Link to="/students" className="btn btn-info text-white" >Go To Students</Link></p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default StutentDetails;
