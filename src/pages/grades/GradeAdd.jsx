//System import
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {  useParams, Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

//Custom import
import defaultProfileMan from "../../images/defaultprofile.jpg";
import defaultProfileWoman from "../../images/defaultprofilewoman.png";
import { server } from "../../utils/variables";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./grades.css";

function GradeAdd() {
  const { id } = useParams();
  const [dataStudent, setDataStudent] = useState({});
  const [dataLessons, setDataLessons] = useState([]);
  const [dataGrades, setDataGrades] = useState([]);
  const [dataGradeTypes, setDataGradeTypes] = useState([]);
  const [formData, setFormData] = useState({});
  const [updated, setUpdated] = useState(false);
  const filteredGrades = dataGrades.filter(
    (grade) => grade.studentID === Number(id)
  );

  //SET FORM DATA
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      studentID: dataStudent.id,
    }));
  };


  //CLEAR CONTROLS
  const clearControls = () => {
    formData.gradePoint = "";
  };

  //CANCEL UPDATE
  const handleCancel = () => {
    setUpdated(false);
    setFormData((prevState) => ({
      ...prevState,
    }));
    clearControls();
    toast.warning("Update cancelled");
  };

  //POST GRADE
  const handleAdd = () => {
    axios
      .post(server + "/grades", formData)
      .then(() => {
        toast.success("Added new grade successfully");
      })
      .catch((err) => {
        toast.error("Error: "+err.message )
      });
  };

  //GET STUDENT
  const getStudent = (id) => {
    axios
      .get(server + "/students/" + id)
      .then((res) => {
        const data = res.data;
        setDataStudent(data);
      })
      .catch((err) => {
        toast.error("Error: "+err.message )
      }
      );
  };

  //GET GRADE TO EDIT
  const handleEdit = (id) => {
    axios
      .get(server + "/grades/" + id)
      .then((res) => {
        const data = res.data;
        setFormData(data);
        setUpdated(true);
        toast.success("Grade will be edited");
      })
      .catch((err) => {
        toast.error("Error: "+err.message )
      });
  };

  //SUBMIT FORM
  const handleSubmit = (e, id) => {
    e.preventDefault();
    if (updated) {
      handleUpdate(id);
      setUpdated(false);
    } else {
      handleAdd();
    }
    clearControls();
    getGrades();
  };

  //GET LESSONS
  const getLessons = () => {
    axios
      .get(server + "/lessons")
      .then((res) => {
        setDataLessons(res.data);
      })
      .catch((err) => {
        toast.error("Error: "+err.message )
      });
  };

  //GET GRADE TYPES
  const getGradeTypes = () => {
    axios
      .get(server + "/gradeTypes")
      .then((res) => {
        setDataGradeTypes(res.data);
        console.log(dataGradeTypes);
      })
      .catch((err) => {
        toast.error("Error: "+err.message )
      });
  };

  //UPDATE GRADE
  const handleUpdate = (id) => {
    axios
      .put(server + "/grades/" + id, formData)
      .then((res) => {
        console.log(res.data);
        toast.success("Grade updated successfully");
      })
      .catch((err) =>{
        toast.error("Error: "+err.message )
      });
      
  };

  //GET GRADES
  const getGrades = () => {
    axios
      .get(server + "/grades")
      .then((res) => {
        setDataGrades(res.data);
      })
      .catch((err) => {
        toast.error("Error: "+err.message )
      });
  };
  useEffect(() => {
    getLessons();
    getGrades();
    getGradeTypes();
    getStudent(id);
  }, [updated]);
  return (
    <div>
      <Header />
      <div className="page my-3">
        <div className="page-title">
          <h1>
            <span className="text-muted">Add Grade For </span>
            {dataStudent.firstName + " " + dataStudent.lastName}
          </h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    style={{ height: "200px" }}
                    src={
                      dataStudent.photo
                        ? dataStudent.photo
                        : dataStudent.gender == "Male"
                        ? defaultProfileMan
                        : defaultProfileWoman
                    }
                    className="img-fluid"
                    alt="Profile Photo"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title cardTitle">
                      <span className="text-muted">Full Name: </span>
                      {dataStudent.firstName} {dataStudent.lastName}
                      <span id="studentID" className="text-danger fw-3">
                        {" "}
                        ID: {dataStudent.id}
                      </span>
                    </h5>
                    <p className="card-text">
                      <span className="text-muted">Class: </span>
                      {dataStudent.classID}
                    </p>
                    <p className="card-text">
                      <span className="text-muted">School Number: </span>
                      {dataStudent.schoolNumber}
                    </p>
                    <p className="card-text">
                      <span className="text-muted">Birth Date: </span>
                      {dataStudent.birthDate}
                    </p>
                    <Link to="/grades" class="badge badge-danger text-danger">Return to Grades Page</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-light table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Lesson</th>
                  <th>Grade Type</th>
                  <th>Grade Point</th>
                  <th>Opr</th>
                </tr>
              </thead>
              <tbody>

                {filteredGrades.length>0&&
                filteredGrades.map((grade) => {
                  const filteredLesson = dataLessons.find(lesson=>{
                    if(Number(lesson.id) === Number(grade.lessonID)){
                      return lesson;
                    }
                  });
                  
                  return(
                  <tr key={grade.id} className="text-center">
                    <td>{grade.id}</td>
                    <td>{filteredLesson.lessonName}</td>
                    <td>{grade.gradeType}</td>
                    <td>{grade.gradePoint}</td>

                    <td>
                      <button
                        onClick={() => {
                          handleEdit(grade.id);
                        }}
                        className="btn btn-sm"
                      >
                        <FaEdit className="text-warning" />
                      </button>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>

        <form onSubmit={(e)=>{handleSubmit(e,formData.id)}}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="class">Select Lesson</label>
              <select
                onChange={handleChange}
                className="form-select"
                name="lessonID"
                id="lessonID"
                required
                value={formData.lessonID}
              >
                <option value="">Select</option>
                {dataLessons.length > 0 &&
                  dataLessons.map((dataLesson) => (
                    <option key={dataLesson.id} value={dataLesson.id}>
                      {dataLesson.lessonName}-{dataLesson.lessonCode}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="class">Select Grade Type</label>
              <select
                onChange={(e) => handleChange(e)}
                className="form-select"
                value={formData.gradeType}
                name="gradeType"
                id="gradeType"
                required
              >
                <option value="">Select</option>
                {
                  dataGradeTypes.length > 0 &&dataGradeTypes.map(gradeType => 
                    <option value={gradeType.id}>{gradeType.gradeTypeName}</option>
                  )
                }
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="">Grade Point</label>
              <input
                onChange={(e) => handleChange(e)}
                value={formData.gradePoint}
                type="text"
                name="gradePoint"
                id="gradePoint"
                className="form-control"
                required
                minLength={2}
                maxLength={3}
              />
            </div>
            <div className="col-md-6 mt-4">
              <button
                type="submit"
                className={`btn btn-${updated ? "warning" : "info text-white"}`}
              >
                {updated ? "UPDATE" : "ADD NEW"}
              </button>
              {updated && (
                <button
                  onClick={handleCancel}
                  type="button"
                  className="btn btn-secondary mx-2"
                >
                  CANCEL
                </button>
              )}{" "}
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default GradeAdd;
