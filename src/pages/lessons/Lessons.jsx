import React, { useState, useEffect } from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'
import axios from 'axios';
import {toast} from 'react-toastify'

import {server} from '../../utils/variables'
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Lessons() {

    const [dataLessons, setDataLessons] = useState([]);
    const [formData, setFormData] = useState({})
    const [updated, setUpdated] = useState(false);
    
    //SET FORM DATA
    const handleChange = (e)=>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
          }));
    }

    //POST LESSON
    const handleAdd = ()=>{

        axios
        .post(server+"/lessons", formData)
        .then((res) => {
            console.log(res.data);
            toast.success("Lesson added successfully")
        })
        .catch((err) => console.log(err)); 
        showDataList();
    }

    //SUBMIT FORM
    const handleSubmit = (e,id)=>{
        e.preventDefault();
        if(updated){
            handleUpdate(id);
            setUpdated(false);
            console.log(formData);
        }else{
            handleAdd();
        }
        clearControls();

    }

    //CLEAR CONTROLS
    const clearControls = ()=>{
       formData.lessonName = "";
       formData.lessonCode= "";
    }

    //GET LESSON TO EDIT
    const handleEdit =  (id)=>{
         axios.get(server+"/lessons/"+id)
        .then((res) =>{
            const data = res.data;
            setFormData(data)
            setUpdated(true);
        })
        .catch((err) => console.log(err));
    }

    //UPDATE LESSON
    const handleUpdate=(id) => {
        axios.put(server+"/lessons/"+id,formData)
        .then((res) =>{
            console.log(res.data);
            toast.success("Lesson updated successfully")
        })
        .catch((err) => console.log(err));
    }

    //CANCEL UPDATING
    const handleCancel =()=>{
        setUpdated(false);
        setFormData((prevState)=>({
            ...prevState
        }));
        console.log(formData);
        clearControls();
        toast.warning("Update cancelled")
    }

    //DELETE LESSON
    const handleDelete = async (id) => {
        await axios.delete(server+"/lessons/"+id)
        .then(()=>{
            showDataList();
            toast.success("Lesson deleted successfully")
        })
        .catch(err => 
            {
                toast.error("Error deleting item: "+err.message)
            }
        )
    }

    // GET ALL LESSONS
    const showDataList =()=>{
        axios.get(server+"/lessons")
        .then((res)=>{
            setDataLessons(res.data);
        })
        .catch(err => {
            toast.error("Error: "+err.message )
        })
    }


    useEffect(()=>{
       showDataList();
    },[updated])
  return (
      <div>
        <Header />
            <div className='page my-3'>
                <div className="page-title">
                    <h1>Lessons</h1>
                </div>
                <div className="row">
                <div className="col-12 col-md-6">
                        <div className="row">
                            <form onSubmit={(e)=>{
                                handleSubmit(e,formData.id)
                                }}>
                            <div className="col-12 mb-3">
                                <label htmlFor="lessonName">Name:</label>
                                <input minLength={3} required onChange={handleChange} value={formData.lessonName} type="text" className='form-control' name="lessonName" id="lessonName" />
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="lessonCode">Code:</label>
                                <input minLength={3} maxLength={3} required onChange={handleChange} value={formData.lessonCode} type="text" className='form-control' name="lessonCode" id="lessonCode" />
                            </div>
                            <div className="col-12 mb-3">
                            <button type='submit' className={`btn btn-${updated?"warning":"info text-white"}`}>{updated?"UPDATE":"ADD NEW"}</button>
                            {
                                updated && <button onClick={handleCancel} type='button' className="btn btn-secondary mx-2">CANCEL</button>
                            }
                            </div>
                            </form>

                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                    <table className="table table-light table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Opr</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {dataLessons?dataLessons.map((lesson, index)=>

                                <tr key={index}>
                                    <td>{lesson.id}</td>
                                    <td>{lesson.lessonName}</td>
                                    <td>{lesson.lessonCode}</td>
                                    <td>
                                        <button onClick={()=>{handleEdit(lesson.id)}} className='btn btn-sm'><FaEdit className='text-warning' /></button>
                                        <button onClick={()=>{handleDelete(lesson.id)}} className='btn btn-sm'><FaTrash className='text-danger' /></button>
                                        </td>
                                </tr>
                            ):<tr>
                                <td colSpan={4} className='text-center'>"There is no data available"</td>
                            </tr>
                            }
                            
                        </tbody>
                    </table>

                    </div>
                </div>
            </div>
        <Footer/>
      </div>
  )
}

export default Lessons


