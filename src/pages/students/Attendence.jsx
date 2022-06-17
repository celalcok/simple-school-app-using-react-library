// System import
import React,{useState, useEffect} from 'react'
import StudentList from './StudentList'
import axios from 'axios'
import {toast} from 'react-toastify'

//Custom import
import {server} from "../../utils/variables"
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
function Attendence() {
    const [dataStudents, setDataStudents] = useState([])
    const [dataClasses, setDataClasses] = useState([])
    const [search, setSearch] = useState("");
    const [id, setId] = useState()
    const filteredStudent = dataStudents.filter(student => student.id === id);
    

    const handleChange = (e)=>{
        setSearch(e.target.value.toString());
        showData(search);
        
      }
    
      const handleClick=(e)=>{
        setId(e.target.id)
        console.log(id)
      }


    //GET ALL CLASSES
    const showData =()=>{
       
        const classesURL = server+"/classes";
        axios.get(classesURL)
        .then((res)=>{
            setDataClasses(res.data);
        })
        .catch(err => {
            toast.error("Error: "+err.message )
        })
    }
    useEffect(()=>{
       showData();
    },[])
  return (
    <div>
    <Header/>
    <div className='page my-3'>
        <div className="page-title">
            <h1>Attendence</h1>
        </div>
        <div className="row">
            <div className="col-md-12">
                <label htmlFor="class">Select Class:</label>
                <select className='form-select' name="class" id="class">
                    <option value="0">Select</option>
                    {
                        dataClasses.map((classes,index)=><>
                            <option key={index} value="{classes.id}">{classes.className}-{classes.sectionName}</option>
                        </>)
                    }
                </select>
            </div>
        </div>
        <div className="row my-5">
            <div className="col-12">
                <label htmlFor="schoolNumber">Search</label>
                <input onChange={handleChange} placeholder="Search Student" type="text" className="form-control" name="" id="" />
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <StudentList 
                    list={dataStudents} 
                    handleClick ={handleClick}
                    />
                   
            </div>
        </div>

    </div>
    <Footer/>
  </div>
  )
}

export default Attendence