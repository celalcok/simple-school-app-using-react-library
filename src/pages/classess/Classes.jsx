// System import
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {FaEdit, FaTrash} from 'react-icons/fa'
import {toast} from "react-toastify"

// Custom import
import {server} from '../../utils/variables'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
function Classes() {
    const[dataClasses, setDataClasses] =useState([])
    const [formData, setFormData] = useState({})
    const [updated, setUpdated] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const newFormData ={...formData}
    const handleChange = (e)=>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
          }));
    }

    //SORT ARRAY
    const sortedClasses = [...dataClasses]
    sortedClasses.sort((a,b) =>{
        if(a.className < b.className) return -1;
        if(a.className > b.className) return 1;
        return 0;
    })

    //ADD NEW CLASS
    const handleAdd = ()=>{

        axios
        .post(server+"/classes", newFormData)
        .then(() => {
            toast.success("Added new class successfully")
        })
        .catch((err) => {
            toast.error("Error: "+err.message )
        }); 
        showData();
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
       formData.className = "";
       formData.sectionName = "";
    }



    //EDIT CLASS
    const handleEdit =  (id)=>{
         axios.get(server+"/classes/"+id)
        .then((res) =>{
            const data = res.data;
            setFormData(data);
            setUpdated(true);
            toast.success("Class will be edited")
        })
        .catch((err) => {
            toast.error("Error: "+err.message )
        });
    }


    //UPDATE CLASS
    const handleUpdate=(id) => {
        axios.put(server+"/classes/"+id,formData)
        .then((res) =>{
            setIsSubmit(true);
            toast.success("Class updated successfully")
        })
        .catch((err) => {
            toast.error("Error: "+err.message )
        });
    }


    //CANCEL UPDATE
    const handleCancel =()=>{
        setUpdated(false);
        setFormData((prevState)=>({
            ...prevState
        }));
        console.log(formData);
        clearControls();
        toast.warning("Update cancelled")
    }


    //GET CLASSES
    const showData =()=>{
        axios.get(server+"/classes")
        .then((res)=>{
            setDataClasses(res.data);
        })
        .catch(err => console.log(err))
    }

    //DELETE CLASS
    const handleDelete = async (id) => {
        await axios.delete(server+"/classes/"+id)
        .then((res)=>{
            console.log(res.data.status)
            showData();
            toast.success("Class deleted successfully")
        })
        .catch(err => {
            toast.error("Error: "+err.message )
        })
    }
    useEffect(()=>{
       showData();
    },[updated,isSubmit])
  return (

    <div>
    <Header/>
        <div className="page my-3">
            <div className="page-title">
                <h1>Classes</h1>
            </div>
            <div className="row">
     
            <div className="col-12 col-md-6">
            <form onSubmit={(e)=>{
                            handleSubmit(e,formData.id)
                            }}>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <label htmlFor="className">Class:</label>
                            <input maxLength={2} required onChange={handleChange} value={formData.className} type="text" className='form-control' name="className" id="className" />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="sectionName">Section:</label>
                            <input maxLength={1} style={{textTransform:"uppercase"}} required onChange={handleChange} value={formData.sectionName} type="text" className='form-control' name="sectionName" id="sectionName" />
                        </div>
                        <div className="col-12 mb-3">
                        <button type='submit' className={`btn btn-${updated?"warning":"info text-white"}`}>{updated?"UPDATE":"ADD NEW"}</button>
                        {
                            updated && <button onClick={handleCancel} type='button' className="btn btn-secondary mx-2">CANCEL</button>
                        }
                        </div>
                    </div>
                </form>
                </div>

                <div className="col-12 col-md-6">
                <table className="table table-light table-hover">
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Section</th>
                            <th>Opr</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {sortedClasses?sortedClasses.map((sortedClass,index)=>
                            <tr key={index}>
                                <td>{sortedClass.className}</td>
                                <td>{sortedClass.sectionName}</td>
                                <td>
                                <button onClick={()=>{handleEdit(sortedClass.id)}} className='btn btn-sm'><FaEdit className='text-warning' /></button>
                                    <button onClick={()=>{handleDelete(sortedClass.id)}} className='btn btn-sm'><FaTrash className='text-danger' /></button>
                                    </td>
                            </tr>
                            
                        ):
                        <tr>
                            <td className='text-ceter' colSpan="3">There is no data available</td>
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

export default Classes