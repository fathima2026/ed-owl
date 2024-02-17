import React from 'react'
import Sidebar from '../Sidebar'
import {Button,Form} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import Swal from 'sweetalert2'
import ProgressBar from 'react-bootstrap/ProgressBar';
const baseUrl = 'http://127.0.0.1:8000/api'
const StudentCourses = () => {

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const [moduleData, setModuleData] = useState([]);

  const [module, setModule] = useState({

    code: '',

  });

  const handleChange=(event) => {
    console.log("event.target.name,event.target.value")
    setModule({
      ...module,
      [event.target.name]:event.target.value
    })
  }


  const handleClose = (event) => {
    
    //const moduleFormData = new FormData();
    
  
    setShow(false);

    if(module.code){
    try{
      axios.get(baseUrl+'/enroll/'+module.code).then((response)=>{

        setModule({

          code:''
       });
      
       console.log(response.data[0].id)
       enroll(response.data[0].id, localStorage.getItem('id'))
      
    })
  
    }catch(e) {
      console.log("e.message")
    }
  }

}

  const enroll= (course_id,student_id)=>{


    try{
      axios.get(baseUrl+'/fetch-enroll-status/'+student_id+'/'+course_id).then((response)=>{
        
        if(response.data.bool){
          console.log(response.data.bool);
          alert("You are already enrolled in this course.");
        }else{

          const moduleFormData = new FormData();

          moduleFormData.append("course", course_id)
          moduleFormData.append("student", student_id);
         
          
      
      
      
          try{
            axios.post(baseUrl+'/enrolled-module/',moduleFormData).then((response)=>{
              console.log(response)
              Swal.fire({
            
                title: 'Course added successfully',
                icon: 'success',
                toast:true,
                timer:3000,
                timerProgressBar: true,
                showConfirmButton: false
        
               })
            })}
            catch(error){
              console.log(error)
            }}
        
        

          
      })
    }catch(error){
       console.log(error)
    }
     
   

  }



  const id = localStorage.getItem('id')

  useEffect(() =>{ 
 
   
  //  http://localhost:8000/api/student-module/2/
    try{
     axios.get(baseUrl+'/student-module/'+id).then((response)=>{

      setModuleData(response.data); 
      console.log(response.data)
     });}
     catch(error){
      console.log(error)
     }

   },[]);

 


  const studentLoginStatus = localStorage.getItem('studentLoginStatus')


  return (
    <div className="row">
    <aside className='col-2'>
    <Sidebar/>
    </aside>
    
    <section className='col-10' style={{backgroundColor: 'white',height:'800px',overflowX:'hidden',overflowY:'auto',overflow:'auto'}}>
    <div className="container py-5">
    <div className="row">
    
    
    
    <Modal show={show} onHide={handleClose}  centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Classroom code</Form.Label>
              <Form.Control
                type="text"
                placeholder="classroom code"
                autoFocus onChange={handleChange}value={module.code} name="code"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  size="sm" style={{width:'30%', margin:'auto'}} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button   size="sm" style={{width:'30%', margin:'auto'}} variant="primary" onClick={handleClose}>
            Enroll
          </Button>
        </Modal.Footer>
      </Modal>


    {moduleData==null && <> <p className="py-4"style={{textAlign:'center'}}>You do not have any courses currently! Please add some courses!</p>
   
  
    {/* <Button size="sm" style={{width:'30%', margin:'auto'}} as={Link} to="student/add-course" variant="success">Add courses!</Button>{' '} */}
    
    </>}
   
    {moduleData!=null && <>
    
      {moduleData.map((module,index)=>
      
       <Card style={{ margin:'10px',width: '18rem' }}>
       <Card.Body>

       <ProgressBar variant="danger" animated now={module.tasks*100} label={`${module.tasks*100}%`} />
        <Card.Title>{module.title}</Card.Title>

        <Card.Subtitle className="mb-2 text-muted">{module.code}</Card.Subtitle>
        <Card.Text>
        {module.description.substring(0, 100)}...
        </Card.Text>
        <Card.Link style={{ color:'green' }} as={Link} to={`/student/topic/`+module.id}>View Module</Card.Link>
        <Card.Link style={{ color:'blue' }} as={Link} to={`/teacher/edit-module/`+module.id}>Assignments</Card.Link>
       </Card.Body>
      </Card>
      
      )}
         
        
        
</>}
        
      </div>
    </div>
    <Button size="sm" style={{width:'30%', margin:'auto'}} variant="primary" onClick={handleShow}>
        Add Classroom Code
      </Button>  </section>
    
  
  </div>

  )
}

export default StudentCourses