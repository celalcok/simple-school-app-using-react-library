import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios";
import {toast} from "react-toastify"

// Custom import
import { server } from "../../utils/variables";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
function TeacherEdit() {
  const {id} = useParams();
  const navigate =useNavigate();
  const [dataLessons, setDataLessons] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    personalID: "",
    branch: "",
    gender: "",
    phoneNumber: "",
    photo: "",
    address: "",
  });

  const {
    firstName,
    lastName,
    branch,
    gender,
    photo,
    phoneNumber,
    address,
  } = formData;



  //
  const handleChange = (e) => {
      //For File
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        photo: e.target.files,
      }));
    }

    //For Text/Number/Boolean
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
       
      }));
    }
    
  };


  //SUBMIT FORM
  const handleSubmit = (e,id) => {
    e.preventDefault();
      handleUpdate(id);
  };


    //UPDATE TEACHER
    const handleUpdate=(id) => {
      axios.put(server+"/teachers/"+id, formData)
      .then((res) =>{
          console.log(id);
          toast.success("Teacher updated successfully")
      })
      .catch((err) =>{ console.log(err)
        toast.error("Error: "+err.message)
      }
      
      );
      navigate("/teachers")
  }


  //GET LESSONS
  const showDataList = () => {
    axios
      .get(server + "/lessons")
      .then((res) => {
        setDataLessons(res.data);
      })
      .catch((err) => console.log(err));
  };


  //GET TEACHER
  const getTeacher = (id) => {
    axios(server + "/teachers/"+id)
    .then((res) => {
      setFormData(res.data);
    })
    .catch((err) => console.log(err))
  }
  useEffect(() => {
    showDataList();
    getTeacher(id);
  }, []);

  return (

    <div>
      <Header/>
        <div className="page my-3">
          <div className="page-title">
            <h1><span>Edit </span>{firstName + " " + lastName}</h1>
          </div>
          <form onSubmit={(e)=>{handleSubmit(e,formData.id)}} className="row">
            <div className="mb-3 col-md-6">
              <label className="col-sm-3 col-form-label" htmlFor="firstName">
                First Name:
              </label>
              <input
                minLength={3}
                onChange={handleChange}
                value={firstName}
                className="col-sm-3 form-control"
                type="text"
                name="firstName"
                placeholder="Enter first name"
                id=""
                required
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="col-sm-3 col-form-label" htmlFor="lastName">
                Last Name:
              </label>
              <input
                onChange={handleChange}
                value={lastName}
                className="col-sm-3 form-control"
                type="text"
                name="lastName"
                placeholder="Enter last name"
                id=""
                required
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="col-sm-3 col-form-label" htmlFor="birthDate">
                Branch:
              </label>
              <select onChange={handleChange} className="form-select" name="branch" id="branch" required value={branch}>
                <option value="">Select</option>
                {dataLessons.length > 0 &&
                  dataLessons.map((dataLesson) => (
                    <option {...dataLesson.id === branch&&"Selected"} key={dataLesson.id} value={dataLesson.id}>
                      {dataLesson.lessonName}-{dataLesson.lessonCode}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3 col-md-6">
              <label className="col-sm-3 col-form-label" htmlFor="gender">
                Gender:
              </label>

              <div className="form-check">
                <input
                  onChange={handleChange}
                  value="Male"
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  checked={gender==="Male" ? true : false}
                  />
                <label className="form-check-label" htmlFor="gender">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  onChange={handleChange}
                  value="Female"
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="famale"
                  checked={gender==="Female" ? true : false}
                  />
                <label className="form-check-label" htmlFor="gender">
                  Female
                </label>
              </div>
            </div>
            <div className="mb-3 col-md-6">
              <label className="col-sm-3 col-form-label" htmlFor="address">
                Address:
              </label>
              <textarea
                onChange={handleChange}
                value={address}
                name="address"
                className="col-sm-3 form-control"
                id=""
                required
                minLength={10}
              ></textarea>
            </div>
            <div className="mb-3 col-md-6">
              <label className="col-sm-3 col-form-label" htmlFor="birthDate">
                Phone Number:
              </label>
              <input
                onChange={handleChange}
                value={phoneNumber}
                className="col-sm-3 form-control"
                type="tel"
                name="phoneNumber"
                id=""
                required
                minLength={11}
                maxLength={15}
              />
            </div>
            <div className="mb-3 col-md-12">
          <label className="col-sm-3 col-form-label" htmlFor="photo">
            Photo:
          </label>
          <input
            onChange={handleChange}
            value={photo}
            className="col-sm-3 form-control"
            type="text"
            name="photo"
            id="photo"
            placeholder="Enter URL for photo"

          />
        </div>
            <div className="mb-3 col-md-6">
              <button type='submit' className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>

      <Footer/>
    </div>
  );
}

export default TeacherEdit;
