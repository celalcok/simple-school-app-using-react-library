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

function GradeAdd() {
  const { id } = useParams();
  const [dataStudent, setDataStudent] = useState({});
  const [dataLessons, setDataLessons] = useState([]);
  const [dataAttendences, setDataAttendences] = useState([]);
  const [formData, setFormData] = useState({});
  const [updated, setUpdated] = useState(false);
  const [message, setMessage] = useState({
    messageStyle:"",
    message:""
  })
  const [days,setDays] = useState(null);
  
  const {studentID, dateAbsent, description} = formData;
  const filteredAttendencesForTheStudent = dataAttendences.filter(
    (attendence) => attendence.studentID === Number(id)
  );
  const filteredAttendenceForToday =filteredAttendencesForTheStudent && filteredAttendencesForTheStudent.filter(filteredToday =>
    {
      if(filteredToday.dateAbsent.dayAbsent === new Date().getDate() &&
      filteredToday.dateAbsent.monthAbsent === new Date().getMonth()+1 &&
      filteredToday.dateAbsent.yearAbsent === new Date().getFullYear()){
        return true;
      }
    })
  console.log(filteredAttendencesForTheStudent.length);
  console.log(filteredAttendenceForToday.length);

  //SET FORM DATA
  const handleChange = (e) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    setFormData((prevState) => ({
      ...prevState,
      description: e.target.value,
      studentID: dataStudent.id,
      dateAbsent:{
        dayAbsent:day,
        monthAbsent:month,
        yearAbsent:year
      }
    }));
  };

  //CLEAR CONTROLS
  const clearControls = () => {
    formData.description = "";
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

  const handleAdd = () => {
    if(filteredAttendenceForToday.length > 0) {
      toast.warning("This student has already been added")
    }else{
      axios
        .post(server + "/attendences", formData)
        .then(() => {
          setDays(filteredAttendencesForTheStudent.length);
          toast.success("Added new grade successfully");
        })
        .catch((err) => {
          toast.error("Error: " + err.message);
        });
      console.log(formData);

    }
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
        toast.error("Error: " + err.message);
      });
  };


  //EDIT GRADE
  const handleEdit = (id) => {
    axios
      .get(server + "/attendences/" + id)
      .then((res) => {
        const data = res.data;
        setFormData(data);
        setUpdated(true);
        toast.success("Attendenve will be edited");
      })
      .catch((err) => {
        toast.error("Error: " + err.message);
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
    getAttendences();
  };

  //GET LESSONS
  const getLessons = () => {
    axios
      .get(server + "/lessons")
      .then((res) => {
        setDataLessons(res.data);
      })
      .catch((err) => {
        toast.error("Error: " + err.message);
      });
  };

  //UPDATE GRADE
  const handleUpdate = (id) => {
    axios
      .put(server + "/attendences/" + id, formData)
      .then((res) => {
        console.log(res.data);
        toast.success("Attendence updated successfully");
      })
      .catch((err) => {
        toast.error("Error: " + err.message);
      });
  };

  //GET ATTENDENCES
  const getAttendences = () => {
    axios
      .get(server + "/attendences")
      .then((res) => {
        setDataAttendences(res.data);
        setDays(filteredAttendencesForTheStudent.length);
        controlAttendenceDays();
      })
      .catch((err) => {
        toast.error("Error: " + err.message);
      });
  };

  //CONTROL ATTENDENCE DAYS
  const controlAttendenceDays =() => {
    if(days>0){
      setMessage((prevState)=>({
        ...prevState,
        message:<p className="text-center"><strong>Attention</strong><br/> This student did not come to school for {days} days during the year.</p>,
        messageStyle:"warning"
      }))
    }
    else{
      setMessage((prevState)=>({
        ...prevState,
        message:<p className="text-center"><strong>Congratulations</strong><br/>This student has not been absent during the year</p>,
        messageStyle:"success"
      }))
    }
  }
  useEffect(() => {
      getLessons();
      getAttendences();
      getStudent(id);
      controlAttendenceDays();
  }, [updated, days]);
  return (
    <div>
      <Header />
      <div className="page my-3">
        <div className="page-title">
          <h1>
            <span className="text-muted">Take Attendence For </span>
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
                    <Link
                      to="/student-attendence"
                      class="badge badge-danger text-danger"
                    >
                      Return to Attendence Page
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              class={`alert alert-${message.messageStyle}`}
              role="alert"
            >
              {message.message}
 
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12">
            <table className="table table-light table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Opr</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendencesForTheStudent.length > 0 &&
                  filteredAttendencesForTheStudent.map((attendence) => {

                    return (
                      <tr key={attendence.id} className="text-center">
                        <td>{attendence.id}</td>
                        <td>{attendence.dateAbsent.dayAbsent+"."+attendence.dateAbsent.monthAbsent+"."+attendence.dateAbsent.yearAbsent}</td>
                        <td>{attendence.description}</td>

                        <td>
                          <button
                            onClick={() => {
                              handleEdit(attendence.id);
                            }}
                            className="btn btn-sm"
                          >
                            <FaEdit className="text-warning" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
       
      
      

        <form
          onSubmit={(e) => {
            handleSubmit(e, formData.id);
          }}
        >
          <div className="row">

            <div className="col-md-6 mb-3">
              <label htmlFor="">Description</label>
              <input
                onChange={(e) => handleChange(e)}
                value={description}
                type="text"
                name="description"
                id="description"
                className="form-control"
                required
                minLength={10}
                maxLength={100}
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
