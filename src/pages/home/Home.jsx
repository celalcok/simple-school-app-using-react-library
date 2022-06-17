// System import
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// Custom import
import { server } from "../../utils/variables";
import imgstudents from "../../images/students.png";
import imgteachers from "../../images/teachers.png";
import imgclassess from "../../images/classes.png";
import imgclessons from "../../images/lessons.png";
import imgattendence from "../../images/attendence.png";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./home.css";
import { FaArrowRight, FaChevronRight } from "react-icons/fa";

const Home = () => {
  const [dataStudents, setDataStudents] = useState([]);
  const [dataAttendence, setDataAttendence] = useState([]);
  const [dataClasses, setDataClasses] = useState([]);
  const [dataTeachers, setDataTeachers] = useState([]);
  const [dataLessons, setDataLessons] = useState([]);
  const [dataStudent, setDataStudent] = useState({});
  const {classID} =dataStudent;
  const filteredAttendences = dataAttendence.filter((attendence) => {
    if (
      attendence.dateAbsent.dayAbsent === new Date().getDate() &&
      attendence.dateAbsent.monthAbsent === new Date().getMonth() + 1 &&
      attendence.dateAbsent.yearAbsent === new Date().getFullYear()
    ) {
      return true;
    }
  });

  //MAILTO
  const handleMail = (e, student) => {
    e.preventDefault();
    let subject ="Attendence for " + student.firstName;
    let body=  "Our student "+student.firstName+" "+student.lastName+" did not come today. We wanted to inform you about this.";
    window.open(
      `mailto:${student.email}?subject=${subject}&body=${body}`
    );
  };


  //GET DATAS
  const getDatas = (list) => {
    const URL = server + "/" + list;
    axios
      .get(URL)
      .then((res) => {
        if (list === "students") setDataStudents(res.data);
        else if (list === "teachers") setDataTeachers(res.data);
        else if (list === "attendences") setDataAttendence(res.data);
        else if (list === "lessons") setDataLessons(res.data);
        else if (list === "classes") setDataClasses(res.data);
      })
      .catch((err) => {
        toast.error("Error: " + err.message);
      });
  };



  useEffect(() => {
    getDatas("students");
    getDatas("attendences");
    getDatas("teachers");
    getDatas("classes");
    getDatas("lessons");
  }, [dataStudent]);
  return (
    <div>
      <Header />
      <div className="page my-3">
        <div className="page-title">
          <h1>Home</h1>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4">
            <div className="mini-card shadow mb-3">
              <img src={imgstudents} alt="" />
              <div className="info">
                <h6 className="text-muted">Students</h6>
                <h2 className="fw-bold">{dataStudents.length}</h2>
                <Link to="/students" className="btn px-3 btn-sm link-go">
                  <FaChevronRight className="arrow" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="mini-card shadow mb-3">
              <img src={imgteachers} alt="" />
              <div className="info">
                <h6 className="text-muted">Teachers</h6>
                <h2 className="fw-bold">{dataTeachers.length}</h2>
                <Link to="/teachers" className="btn px-3 btn-sm link-go">
                  <FaChevronRight className="arrow" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="mini-card shadow mb-3">
              <img src={imgclassess} alt="" />
              <div className="info">
                <h6 className="text-muted">Classes</h6>
                <h2 className="fw-bold">{dataClasses.length}</h2>
                <Link to="/classes" className="btn px-3 btn-sm link-go">
                  <FaChevronRight className="arrow" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="mini-card shadow mb-3">
              <img src={imgclessons} alt="" />
              <div className="info">
                <h6 className="text-muted">Lessons</h6>
                <h2 className="fw-bold">{dataLessons.length}</h2>
                <Link to="/lessons" className="btn px-3 btn-sm link-go">
                  <FaChevronRight className="arrow" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="mini-card shadow mb-3">
              <img src={imgattendence} alt="" />
              <div className="info">
                <h6 className="text-muted">Take Attendece</h6>
                <h2 className="fw-bold">{dataAttendence.length}</h2>
                <Link to="/student-attendence" className="btn px-3 btn-sm link-go">
                  <FaChevronRight className="arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 my-3 ">
            <div className="card border-info shadow">
              <div className="card-header bg-info text-white">
                Students Not Attending School Today
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-light table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>School Number</th>
                        <th>Description</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAttendences.length > 0 ? (
                        filteredAttendences.map((attendence) => {
                          const filteredStudent = dataStudents.find(
                            (student) => {
                              if (student.id === attendence.studentID) {
                                return student;
                              }
                            }
                          );
                          return (
                            <tr key={attendence.id}>
                              <td>{attendence.id}</td>
                              <td>
                                {filteredStudent.firstName}{" "}
                                {filteredStudent.lastName}
                              </td>
                              <td>{filteredStudent.schoolNumber}</td>
                              <td>{attendence.description} </td>
                              <td>
                                <form
                                  onSubmit={(e) =>
                                    handleMail(e, filteredStudent)
                                  }
                                >
                                  <button className="btn btn-info text-white">
                                    Inform Parent by Email
                                  </button>
                                </form>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center py-5">
                            There is no students who is absent
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
