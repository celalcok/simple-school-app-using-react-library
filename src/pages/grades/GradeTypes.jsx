import React, { useState, useEffect } from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'
import axios from 'axios';
import {toast} from 'react-toastify'

import {server} from '../../utils/variables'
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Lessons() {
    const [dataGradeTypes, setDataGradeTypes] = useState([]);
    const [formData, setFormData] = useState({})
    const [updated, setUpdated] = useState(false);
    

    const handleChange = (e)=>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
          }));
    }

    //POST GRADE TYPE
    const handleAdd = ()=>{

        axios
        .post(server+"/gradeTypes", formData)
        .then((res) => {
            toast.success("Grade type added successfully")
        })
        .catch((err) => toast.error("Error: "+err.message)); 
        showDataList();
    }

    //SUBMIT FORM
    const handleSubmit = (e,id)=>{
        e.preventDefault();
        if(updated){
            handleUpdate(id);
            setUpdated(false);
        }else{
            handleAdd();
        }
        clearControls();

    }

    //CLEAR CONTROLS
    const clearControls = ()=>{
       formData.gradeTypeName = "";
    }


    //GET GRADE TYPE TO EDIT
    const handleEdit =  (id)=>{
         axios.get(server+"/gradeTypes/"+id)
        .then((res) =>{
            const data = res.data;
            setFormData(data)
            setUpdated(true);
        })
        .catch((err) => toast.error("Error: "+err.message));
    }

    //UPDATE GRADE TYPE
    const handleUpdate=(id) => {
        axios.put(server+"/gradeTypes/"+id,formData)
        .then((res) =>{
            toast.success("Grade type updated successfully")
        })
        .catch((err) => toast.error("Error: "+err.message));
    }

    //CANCEL UPDATE
    const handleCancel =()=>{
        setUpdated(false);
        setFormData((prevState)=>({
            ...prevState
        }));
        clearControls();
        toast.warning("Update cancelled")
    }


    //DELETE GRADE TYPE
    const handleDelete = async (id) => {
        await axios.delete(server+"/gradeTypes/"+id)
        .then(()=>{
            showDataList();
            toast.success("Grade type deleted successfully")
        })
        .catch(err => 
            {
                toast.error("Error deleting item: "+err.message)
            }
        )
    }

    //GET ALL GRADE TYPE
    const showDataList =()=>{
        axios.get(server+"/gradeTypes")
        .then((res)=>{
            setDataGradeTypes(res.data);
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
                    <h1>Grade Types</h1>
                </div>
                <div className="row">
                <div className="col-12 col-md-6">
                        <div className="row">
                            <form onSubmit={(e)=>{
                                handleSubmit(e,formData.id)
                                }}>
                            <div className="col-12 mb-3">
                                <label htmlFor="gradeTypeName">Name:</label>
                                <input minLength={3} required onChange={handleChange} value={formData.gradeTypeName} type="text" className='form-control' name="gradeTypeName" id="gradeTypeName" />
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
                                <th>Operation</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {dataGradeTypes?dataGradeTypes.map((lesson, index)=>

                                <tr key={index}>
                                    <td>{lesson.id}</td>
                                    <td>{lesson.gradeTypeName}</td>
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


