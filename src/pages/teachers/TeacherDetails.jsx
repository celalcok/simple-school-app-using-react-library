// System import
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
// Custom import
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { server } from "../../utils/variables";
import defaultProfileMan from "../../images/defaultprofile.jpg";
import defaultProfileWoman from "../../images/defaultprofilewoman.png";

function StutentDetails() {
  const [dataTeacher, setDataTeacher] = useState({});
  const [crop, setCrop] = useState({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50
  })
  console.log(crop);


  const { id } = useParams();

  //GET TEACHER
  const showData = () => {
    axios.get(server + "/teachers/" + id).then((res) => {
      console.log(res.data);
      setDataTeacher(res.data);
      console.log(dataTeacher);
    });
  };
  useEffect(() => {
    showData();
  }, []);
  return (
    <div>
      <Header />
      <div className="page py-3">
        <div className="row">
          <div className="col-md-12 page-title mb-3">
            <h1>
              {" "}
              <span className="text-muted">Details For </span>
              {dataTeacher.firstName + " " + dataTeacher.lastName}{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6">
              <img
                style={{ height: "300px", width: "300px" }}
                src={
                  dataTeacher.photo
                    ? dataTeacher.photo
                    : dataTeacher.gender == "Male"
                    ? defaultProfileMan
                    : defaultProfileWoman
                }
                alt="Photo"
              />
          </div>
          <div className="col-12 col-sm-6">
            <h4 className="text-info">
              <span className="text-muted"> Full Name: </span>
              {dataTeacher.firstName + " " + dataTeacher.lastName}
            </h4>
            <p>
              <span className="text-muted">Class ID:</span>{" "}
              {dataTeacher.classID}
            </p>
            <p>
              <span className="text-muted">Birth Date:</span>{" "}
              {dataTeacher.birthDate}
            </p>
            <p>
              <span className="text-muted">School Number:</span>{" "}
              {dataTeacher.schoolNumber}
            </p>
            <p>
              <span className="text-muted">Gender:</span> {dataTeacher.gender}
            </p>
            <p>
              <span className="text-muted">Address:</span> {dataTeacher.address}
            </p>
            <p>
              <span className="text-muted">Phone:</span>{" "}
              {dataTeacher.phoneNumber}
            </p>
            <p>
              <Link to="/teachers" className="btn btn-info text-white">
                Go To Teachers
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default StutentDetails;
