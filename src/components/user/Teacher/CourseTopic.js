import React from 'react'
import Sidebar from '../Sidebar'
import {Button} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import {Link, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const baseUrl = 'http://127.0.0.1:8000/api'
const Topics = () => {
 
  const[topicData, setTopicData]=useState([]);
  const[studentList, setStudentList]=useState([]);
  const[assignmentList, setAssignmentList]=useState([]);
  const [hangmanList, setHangmanList] = useState([]);
  const [quizList, setQuizList] = useState([])

  const[totalResult, setTotalResult]=useState(0);
  const {module_id} = useParams()

  useEffect(() =>{ 



    try{
     axios.get(baseUrl+'/module-topic/'+module_id).then((response)=>{

      setTopicData(response.data); 
      setTotalResult(response.data.length); 

     });}
     catch(error){
      console.log(error)
     }

     try{
      axios.get(baseUrl+'/module-assignment/'+module_id).then((response)=>{
 
       setAssignmentList(response.data); 
 
      });}
      catch(error){
       console.log(error)
      }

      try{
        axios.get(baseUrl+'/module-quiz/'+module_id).then((response)=>{
   
         setQuizList(response.data); 
   
        });}
        catch(error){
         console.log(error)
        }

      try{

        axios.get(baseUrl+'/module-hangman/'+module_id).then((response)=>{
      
           setHangmanList(response.data)
           console.log(hangmanList)
      
        })
      
      }catch(error){
          console.log(error)
      }

              
     try{

      axios.get(baseUrl+'/fetch-enroll-students/'+module_id).then((response)=>{
         setStudentList(response.data)
      })

     }catch(error){
      console.log(error)
     }
          


   },[]);
   const handleRemoveStudent = (studentId) => {
    axios.post(baseUrl+'/remove-student-from-course/', {
        student_id: studentId,
        module_id: module_id,
    })
    .then(response => {
        if (response.data.success) {
            // Reload the student list or update it in state
            // Optionally, show a success message using Swal or other notification library
        } else {
            // Handle the error case
            console.error(response.data.message);
        }
    })
    .catch(error => {
        // Handle the request failure
        console.error(error);
    });
};
   const handleAssignmentDelete = (assignment_id) => {
    Swal.fire({
     title: 'Delete Assignment',
     text: 'Are you sure you want to delete',
     icon: 'info',
     confirmButtonText: 'continue',
     showCancelButton: true
    }).then((result)=>{
 
     if(result.isConfirmed){
 
       try {
         
         axios.delete(baseUrl + '/assignment/'+assignment_id + '/')
         .then((res)=>{
           
           Swal.fire('success', 'assignment deleted successfully');
          
           try{
             axios.get(baseUrl+'/module-assignment/'+module_id).then((response)=>{
        
              setAssignmentList(response.data); 
        
             });}
             catch(error){
              console.log(error)
             }
 
    
         
         
         });
       }catch(error){
         Swal.fire('error', 'Error deleting')
       }
     }else{
       Swal.fire('error', 'Error deleting')
     }
    })
   }
  const handleDelete = (topic_id) => {
   Swal.fire({
    title: 'Delete Topic',
    text: 'Are you sure you want to delete',
    icon: 'info',
    confirmButtonText: 'continue',
    showCancelButton: true
   }).then((result)=>{

    if(result.isConfirmed){

      try {
        
        axios.delete(baseUrl + '/topic/'+topic_id + '/')
        .then((res)=>{
          
          Swal.fire('success', 'Data deleted successfully');
         
          try{
            axios.get(baseUrl+'/module-topic/'+module_id).then((response)=>{
       
             setTopicData(response.data); 
             setTotalResult(response.data.length); 
       
            });}
            catch(error){
             console.log(error)
            }

   
        
        
        });
      }catch(error){
        Swal.fire('error', 'Error deleting')
      }
    }else{
      Swal.fire('error', 'Error deleting')
    }
   })
  }
  return (
    <div className="row" >
    <aside className='col-2'>
    <Sidebar/>
    </aside>
    
    <section className='col-10' style={{backgroundColor: 'white'}}>
   

     <Tabs
      defaultActiveKey="home"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
    {/*
      <Tab eventKey="home" title="Home">
             <div className="container py-5">
      <div className="row">

    {topicData.length==0 && <> <p className="py-4"style={{textAlign:'center'}}>You do not have any topics currently! Please add some topics!</p>
   
    </>}
    {topicData!=0 && <>
    
      {topicData.map((topic,index)=>
      
       <Card style={{ }}>
       <Card.Body>
        <Card.Title>{topic.title}</Card.Title>
        <Card.Link style={{ color:'green' }} as={Link} to={`/teacher/view-topic/`+topic.id}>View topic</Card.Link>
        <Card.Link onClick={()=>handleDelete(topic.id)} style={{ color:'red' }}>Delete topic</Card.Link>
       </Card.Body>
      </Card>
      
      )}
         

        
</>}



      </div>
    </div>
    
    <Button size="sm" style={{width:'30%', margin:'auto'}} as={Link} to={`/teacher/add-topic/`+module_id} variant="success">Add topics!</Button>{' '}
      </Tab> */}
      <Tab eventKey="students" title="students">
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
      {studentList.map((student, index) => (
    <tr key={index}>
        <td>{student.id}</td>
        <td>{student.first_name}</td>
        <td>{student.last_name}</td>
        <td>{student.email}</td>
        <td>
            <button style={{backgroundColor:'#ff3333',borderRadius:'15px',color:'white'}} variant="danger" onClick={() => handleRemoveStudent(student.id)}>
                Remove
            </button>
        </td>
    </tr>
))}
        
      </tbody>
    </Table>
      </Tab>
      <Tab eventKey="Assignments" title="Assignments">
       <p>Post an Assignment</p>
       
       <Button size="sm" style={{width:'30%', margin:'auto',marginBottom:'20px'}} as={Link} to={`/teacher/add-assignment/`+module_id} variant="warning">Add Assignment!</Button>{' '}
        
      <div style={{overflowX:'hidden',overflowY:'auto',overflow:'auto',height:'600px'}}>
    

    {assignmentList.map((assignment,index)=>
         <Card  border="warning" style={{marginBottom:'20px'}}>
            <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{assignment.title}</Card.Subtitle>
        <Card.Text>
          {assignment.description}
        </Card.Text>
        <Card.Link style={{color:'green'}} as={Link} to={`/teacher/edit-assignment/`+assignment.id}>Edit Assignment</Card.Link>
        <Card.Link as={Link} to={`/teacher/assignment/`+assignment.id} href="#">View Assignment</Card.Link>
        <Card.Link style={{color:'red'}} onClick={()=>handleAssignmentDelete(assignment.id)} href="#">Delete Assignment</Card.Link>
      </Card.Body>
       </Card>
     )}
      </div>
      
      
      </Tab>

      <Tab eventKey="Quiz" title="Quiz">
        <Button as={Link} to={`/teacher/setquiz/`+module_id}>Set Quiz</Button>
        <div style={{overflowX:'hidden',overflowY:'auto',overflow:'auto',height:'600px'}}>
    

       {quizList.map((quiz,index)=>
         <Card  border="warning" style={{marginBottom:'20px'}}>
            <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{quiz.title}</Card.Subtitle>
        <Card.Text>
          {quiz.description}
        </Card.Text>
        <Card.Link as={Link} to={`/teacher/quiz/`+quiz.id} href="#">View Quiz</Card.Link>
        <Card.Link style={{color:'red'}} onClick={()=>handleAssignmentDelete(quiz.id)} href="#">Delete Quiz</Card.Link>
      </Card.Body>
       </Card>
     )}
      </div>
      </Tab>
      <Tab eventKey="Game" title="Game">
        <Button variant='warning' as={Link} to={`/teacher/sethangman/`+module_id}>Set Hangman</Button>
        <Button as={Link} to={`/teacher/setquiz/`+module_id}> Set Puzzle</Button>
        <br />Hangman Games :
        <hr />
        <div  style={{overflowX:'hidden',overflowY:'auto',overflow:'auto',height:'300px'}}>
    
    {hangmanList!=0 && <> {hangmanList.map((hangman,index)=>
    <Card border="success" style={{ marginBottom:'5px', height:'200px'}}>
    <Row>
    <Col md="3">
    <img width="180px"src="/image/hangman-game.png" alt="" style={{margin:'auto'}}/>
    </Col>
    <Col>
     <Card.Body style={{textAlign:'left'}}>
          <Card.Title style={{display:'block'}}>{hangman.title}
          <span style={{float:'right'}} >
          <Button id="submit-assignment" style={{marginTop:'-4px',fontSize:'12px',fontWeight:'500'}} as={Link} to={`/teacher/hangman/`+hangman.id}>View Details</Button>
          </span>
          <span style={{float:'right',marginRight:'10px',color:'green'}} >Points: {hangman.total_mark}</span>
          </Card.Title>
          <hr />
          <Card.Text><b>Posted date and time : </b>{hangman.created_date} at {hangman.created_time}</Card.Text>
          <hr />
          <Card.Text style={{display:'block'}}><b>Due date : </b>{hangman.due_date}</Card.Text>
      </Card.Body>
    </Col>
    </Row>
    </Card>)}<hr/></>}</div>

    <hr />

    <div  style={{overflowX:'hidden',overflowY:'auto',overflow:'auto',height:'300px'}}>
    
    {hangmanList!=0 && <> {hangmanList.map((hangman,index)=>
    <Card border="success" style={{ marginBottom:'5px' }}>
    <Row>
    <Col md="3">
    <img width="180px"src="/image/hangman-game.png" alt="" style={{margin:'auto'}}/>
    </Col>
    <Col>
     <Card.Body style={{textAlign:'left'}}>
          <Card.Title style={{display:'block'}}>{hangman.title}
          <span style={{float:'right'}} >
          <Button id="submit-assignment" style={{marginTop:'-4px',fontSize:'12px',fontWeight:'500'}} as={Link} to={`/student/hangman/`+hangman.id}>Enter game</Button>
          </span>
          <span style={{float:'right',marginRight:'10px',color:'green'}} >Points: {hangman.total_mark}</span>
          </Card.Title>
          <hr />
          <Card.Text><b>Posted date and time : </b>{hangman.created_date} at {hangman.created_time}</Card.Text>
          <hr />
          <Card.Text style={{display:'block'}}><b>Due date : </b>{hangman.due_date}</Card.Text>
      </Card.Body>
    </Col>
    </Row>
    </Card>)}<hr/></>}</div>
      </Tab>
    </Tabs>
  </section>

  
  </div>)
}

export default Topics