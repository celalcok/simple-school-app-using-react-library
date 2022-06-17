// System import
import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import {toast} from "react-toastify"
// Custom import
import StudentList from "./StudentList";
import {server} from "../../utils/variables"
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function Students() {

    const [dataStudents, setDataStudents] = useState();

    const handleDelete = async (id) => {
        await axios.delete(server+"/students/"+id)
        .then(()=>{
            showDataList();
            toast.success("Student deleted successfully")
        })
        .catch(err => 
            {
                console.log(err)
                toast.error("Error deleting student: "+err.message)
            }
        )
    }

    //GET ALL STUDENTS
    const showDataList =()=>{
        axios.get(server+"/students")
        .then((res)=>{
            setDataStudents(res.data);
        })
        .catch(err => console.log(err))
    }
    useEffect(()=>{
       showDataList();
    },[])
  return (

    <div>
    <Header/>
    <div className="page my-3">
        <div className="page-title">
            <h1>Students</h1>
        </div>
   <div className="row">
       <div className="col-12 d-flex gap-3 pb-3">
            <Link to="/add-student" className="btn btn-info text-white"> Add New</Link>
            <Link to="/student-attendence" className="btn btn-info text-white">Attendence</Link>
            <Link to="/grades" className="btn btn-info text-white ">Grades</Link>
       </div>
   </div>
    <div className="row">
        <div className="col-12">
            <StudentList handleDelete={handleDelete} dataStudents={dataStudents}  />
        </div>
    </div>
    </div>
    <Footer/>
  </div>
  );
}

export default Students;
