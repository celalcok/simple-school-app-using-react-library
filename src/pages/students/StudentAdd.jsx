import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./students.css";
import axios from "axios";
import { server } from "../../utils/variables";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
function AddStudent() {
  const navigate = useNavigate();
  const [dataClasses, setDataClasses] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    schoolNumber: "",
    classID: "",
    gender: "",
    birthDate: "",
    phoneNumber: "",
    photo: "",
    address: "",
  });
  const {
    firstName,
    lastName,
    phoneNumber,
    classID,
    photo,
    birthDate,
    address,
  } = formData;

  let schoolNo;
  const handleChange = (e) => {
    console.log(e.target);
    //For File
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        photo: e.target.files,
      }));
    }

    //For Text/Number/Boolean
    if (!e.target.files) {
      schoolNo = Math.floor(Math.random() * 3000);
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        schoolNumber: schoolNo,
      }));
    }
  };

  //SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };

  //CANCEL UPDATING
  const handleCancel = () => {
    navigate("/students");
  };

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

  
  //POST STUDENT
  const handleAdd = () => {
    console.log(formData);
    axios
      .post(server + "/students", formData)
      .then(() => {
        {
          toast.success("Student added successfully");
        }
      })
      .catch((err) => {
        toast.error("Error: " + err.message);
      });
    navigate("/students");
  };

  useEffect(() => {
    getClasses();
  },[])

  return (
    <div>
      <Header />
      <div className="page my-3 add-student">
        <div className="row">
          <div className="col-md-12 page-title mb-3">
            <h1>Add New Student</h1>
          </div>
        </div>
        <form id="formSave" onSubmit={handleSubmit} className="row">
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
                      <option key={dataClass.id} value={dataClass.id}>
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
              minLength={20}
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
            <button type="submit" className="btn btn-info text-white">
              Save
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className="btn btn-secondary mx-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddStudent;
