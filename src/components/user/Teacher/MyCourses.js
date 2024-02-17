import React from 'react'
import Sidebar from '../Sidebar'
import {Button} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
const baseUrl = 'http://127.0.0.1:8000/api'
const MyCourses = () => {

  const[moduleData, setModuleData]=useState([]);

  const id = localStorage.getItem('id')

  useEffect(() =>{ 

    try{
     axios.get(baseUrl+'/teacher-module/'+id).then((response)=>{

      setModuleData(response.data); 

     });}
     catch(error){
      console.log(error)
     }

   },[]);


  const studentLoginStatus = localStorage.getItem('studentLoginStatus')
  console.log(moduleData)
  return (
    <div className="row">
    <aside className='col-2'>
    <Sidebar/>
    </aside>
    
    <section className='col-10' style={{backgroundColor: 'white'}}>
    <div className="container py-5">
    <div className="row">

    {moduleData==null && <> <p className="py-4"style={{textAlign:'center'}}>You do not have any courses currently! Please add some courses!</p>
   
    <Button size="sm" style={{width:'30%', margin:'auto'}} as={Link} to="teacher/add-course" variant="success">Add courses!</Button>{' '}</>}
   
    {moduleData!=null && <>
    
      {moduleData.map((module,index)=>
      
       <Card style={{height:'auto', margin:'10px',width: '18rem',border:'1px solid', borderColor:'rgb(7, 101, 195', height:'250px'}}>
       <Card.Body style={{height:'auto'}}>
        
        <Card.Title style={{ color:'blue' , fontSize:'18px'}} as={Link} to={`/teacher/topic/`+module.id}>{module.title}</Card.Title>
        <hr />
        <Card.Subtitle className="mb-2 text-muted">{module.code}</Card.Subtitle>
        <Card.Text style={{marginBottom:'3px'}}>
          {module.description.substring(0, 70)}...
        </Card.Text>
        <Card.Link style={{ color:'green' }} as={Link} to={`/teacher/edit-module/`+module.id}>Edit Module</Card.Link>
        <Card.Link  style={{ color:'red' }} as={Link} to={`/teacher/delete-module/`+module.id}>Delete Module</Card.Link>
       </Card.Body>
      </Card>
      
      )}
         
        
        
</>}
        
      </div>
    </div>
  </section>
    
  
  </div>

  )
}

export default MyCourses