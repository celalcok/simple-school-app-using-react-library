// System import
import React, { useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import axios from "axios";

// Custom import
import "./students.css";
import { server } from "../../utils/variables";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
function EditStudent() {
  const [dataClasses, setDataClasses] = useState([]);
  const [formData, setFormData] = useState({});
  const {
    firstName,
    lastName,
    gender,
    classID,
    phoneNumber,
    birthDate,
    photo,
    address,
  } = formData;

  //GET ID USING USEPARAMS HOOK
  const {id} = useParams();


  const navigate = useNavigate();
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
      navigate('/students');
  };

  //UPDATE STUDENT
  const handleUpdate=(id) => {
    axios.put(server+"/students/"+id,formData)
    .then((res) =>{
        toast.success("Student updated successfully")
    })
    .catch((err) => {
      toast.error("Error: "+err.message )
  });
}

//CANCEL UPDATING
const handleCancel =() => {
  navigate('/students');
}

//GET STUDENT
const getStudent = (id) => {
  axios.get(server+"/students/"+id)
  .then((res) =>{
    const data = res.data;
    setFormData(data);
    console.log(data)
  })
  .catch(err =>{
    toast.error("Error: "+err.message )
  });
}

//GET ALL CLASSES
const getClasses = () => {
  axios.get(server+"/classes/")
  .then((res) =>{
    console.log(res.data)
    setDataClasses(res.data);
  })
  .catch((err) => {
    toast.error("Error: " + err.message)
  })
}

useEffect(() => {
  getClasses();
  getStudent(id);
},[])
  return (
    <div>
    <Header/>
    <div className="page my-3 add-student">
      <div className="row">
        <div className="col-md-12 page-title mb-3">
          <h1><span className="text-muted">Update</span> {firstName+ " "+ lastName}</h1>
        </div>
      </div>
      <form id="formSave" onSubmit={(e)=>{handleSubmit(e,formData.id)}} className="row">
        <div className="mb-3 col-md-6">
          <label className="col-sm-3 col-form-label" htmlFor="firstName">
            First Name:
          </label>
          <input
            onChange={handleChange}
            value={firstName}
            className="col-sm-3 form-control"
            type="text"
            name="firstName"
            placeholder="Enter first name"
            id="firstName"
            required
            minLength={3}
            maxLength={20}
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
            id="lastName"
            required
            minLength={3}
            maxLength={20}

          />
        </div>
        <div className="mb-3 col-md-6">
          <label className="col-sm-3 col-form-label" htmlFor="birthDate">
            Birth Date:
          </label>
          <input
            onChange={handleChange}
            value={birthDate}
            className="col-sm-3 form-control"
            type="date"
            name="birthDate"
            id="birthDate"
            required
          />
        </div>
        <div className="col-md-6">
            <div className="row">
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
                    id="male"
                    checked={gender === "Male"&& true}
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
                    checked={gender === "Female"&& true}

                  />
                  <label className="form-check-label" htmlFor="gender">
                    Female
                  </label>
                </div>
              </div>
              <div className="mb-3 col-md-6">
                <label className="col-sm-3 col-form-label" htmlFor="birthDate">
                  Class:
                </label>
                <select
                  onChange={(e)=>handleChange(e)}
                  className="form-select"
                  name="classID"
                  id="classID"
                  required
                  value={classID}
                  
                >
                  <option value="">Select</option>
                  {dataClasses.length > 0 &&
                    dataClasses.map((dataClass) => (
                      <option {...dataClass.id ===classID&&"selected"} key={dataClass.id} value={dataClass.id}>
                        {dataClass.className}-{dataClass.sectionName}
                      </option>
                    ))}
                </select>
              </div>
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
            id="address"
            required
          ></textarea>
        </div>
        <div className="mb-3 col-md-6">
          <label className="col-sm-3 col-form-label" htmlFor="phoneNumber">
            Phone Number:
          </label>
          <input
            onChange={handleChange}
            value={phoneNumber}
            className="col-sm-3 form-control"
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
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
        <div className="mb-3 col-md-12">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button onClick={handleCancel} type="button" className="btn btn-secondary mx-2">
            Cancel
          </button>
        </div>
      </form>
    </div>
    <Footer/>
  </div>
  );
}

export default EditStudent;
