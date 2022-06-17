import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// Custom import
import { server } from "../../utils/variables";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
function TeacherAdd() {
  const navigate = useNavigate();
  const [dataLessons, setDataLessons] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    personalID: "",
    branch: "",
    gender: "Male",
    phoneNumber: "",
    photo: "",
    address: "",
  });

  const {
    firstName,
    lastName,
    personalID,
    branch,
    gender,
    phoneNumber,
    photo,
    address,
  } = formData;

  let personalId;
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
      personalId = Math.floor(Math.random() * 3000);
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        personalID: personalId,
      }));
    }
  };

  //SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };

  //POST TEACHER
  const handleAdd = () => {
    axios
      .post(server + "/teachers", formData)
      .then((res) => {
        {
          toast.success("Teacher added successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/teachers");
  };

  //GET ALL LESSONS
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

  useEffect(() => {
    getLessons();
  }, []);

  return (
    <div>
      <Header />
      <div className="page my-3">
        <div className="page-title">
          <h1>Add New Teacher</h1>
        </div>
        <form onSubmit={handleSubmit} className="row">
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
            <select
              onChange={handleChange}
              className="form-select"
              name="branch"
              id="branch"
              required
              value={branch}
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
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default TeacherAdd;
