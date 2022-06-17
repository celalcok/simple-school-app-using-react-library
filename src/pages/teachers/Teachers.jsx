import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import TecherList from "./TecherList";
import { server } from "../../utils/variables";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
function Teachers() {
  const [dataTeachers, setDataTeachers] = useState();

  //DELETE TEACHER
  const handleDelete = async (id) => {
    await axios
      .delete(server + "/teachers/" + id)
      .then(() => {
        getAllTeachers();
        toast.success("Teacher deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting teacher: " + err.message);
      });
  };



  //GET ALL TEACHERS
  const getAllTeachers = () => {
    axios
      .get(server + "/teachers")
      .then((res) => {
        setDataTeachers(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllTeachers();
  }, []);

  return (
    <div>
      <Header />
      <div className="page my-3">
        <div className="page-title">
          <h1>Teachers</h1>
        </div>
        <div className="row">
          <div className="col-12 d-flex gap-3 pb-3">
            <Link to="/add-teacher" className="btn btn-info text-white ">
              Add New
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <TecherList
              handleDelete={handleDelete}
              dataTeachers={dataTeachers}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Teachers;
