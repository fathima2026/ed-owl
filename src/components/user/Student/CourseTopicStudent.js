import React from 'react'
import Sidebar from '../Sidebar'
import {Button} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import {Link, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2'
import { Leaderboard } from 'flywheel-leaderboard'

const baseUrl = 'http://127.0.0.1:8000/api'
const CourseTopicStudent = () => {
 
  const[topicData, setTopicData]=useState([]);
  const[studentList, setStudentList]=useState([]);
  const[assignmentList, setAssignmentList]=useState([]);
  const [quizList, setQuizList] = useState([]);
  const[hangmanList, setHangmanList]=useState([]);
  const[totalResult, setTotalResult]=useState(0);
  const[gameTab, setGameTab]=useState(false);
  const {module_id} = useParams()
  const [data, setData] = useState({});

  const handleClick= (e) => {
    if(e=='Game'){
      setGameTab(true)
    }
  }

      useEffect(()=>{

        //fetching hangman datas
            try{
              axios.get(baseUrl+'/module-hangman/'+module_id).then((response)=>{
        
              setHangmanList(response.data); 
              console.log(hangmanList);
        
              });}
              catch(error){
              console.log(error)
              }

      },[gameTab])
        
 


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
         console.log( response.data);
         console.log(quizList.id);
   
        });}
        catch(error){
         console.log(error)
        }
  

              
     try{

      axios.get(baseUrl+'/fetch-enroll-students/'+module_id).then((response)=>{
         setStudentList(response.data)
      })

     }catch(error){
      console.log(error)
     }
     try{
      axios.get(baseUrl+'/rank/'+module_id).then((response)=>{
 
       setData( 
           
            response.data
           
       ); 
       console.log(data.data)
      });}
      catch(error){
       console.log(error)
      }

   },[]);

  return (
    <div className="row">
    <aside className='col-2'>
    <Sidebar/>
    </aside>
    
    <section className='col-10' style={{backgroundColor: 'white'}}>
    <div className="container">
    <div className="row">

    <Tabs
      defaultActiveKey="home"
      id="justify-tab-example"
      className="mb-3"
      justify onSelect={(e) => handleClick(e)}
    >
      <Tab eventKey="home" title="Home">
      {topicData.length==0 && <> <p className="py-4"style={{textAlign:'center'}}>You do not have any topics currently! Please add some topics!</p>
   
   </>}
   {topicData!=0 && <>
   
     {topicData.map((topic,index)=>
     
      <Card style={{ margin:'10px',width: '18rem' }}>
      <Card.Body>
       <Card.Title>{topic.title}</Card.Title>
       <Card.Link style={{ color:'green' }} as={Link} to={`/teacher/view-topic/`+topic.id}>View topic</Card.Link>
      </Card.Body>
     </Card>
     
     )}
        </>}

      </Tab>

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
      {studentList.map((student,index)=>
      
      <tr>
      <td>{student.id}</td>
      <td>{student.first_name}</td>
      <td>{student.last_name}</td>
      <td>{student.email}</td>
    </tr>
     
     )}
        
      </tbody>
    </Table>
      </Tab>

      <Tab eventKey="assignments" title="assignments">
      <div style={{overflowX:'hidden',overflowY:'auto',overflow:'auto',height:'600px'}}>
    

    {assignmentList.map((assignment,index)=>
         <Card  border="warning" style={{marginBottom:'20px'}}>
            <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{assignment.title}</Card.Subtitle>
        <Card.Text>
          {assignment.description}
        </Card.Text>
        <Card.Link as={Link} to={`/student/assignment/`+assignment.id} href="#">View Assignment</Card.Link>
      </Card.Body>
     
     

       </Card>
      

     )}
      </div>
      
        </Tab>
        <Tab eventKey="rank" title="rank">
        <div className='leaderboard-container'>
    <p style={{fontSize:'40px'}}><img style={{width:'80px'}}src='/Image/badge.png'></img>LEADERBOARD<img style={{width:'80px'}}src='/Image/badge.png'></img></p>

  {data && data.data ? (
        <Leaderboard className='tab-rank-table' style={{marginLeft:'100px'}}
          scoringMetric="points"
          id=""
          cell1="first_name"
          cell2="last_name"
          cell3="email"
          cell4="points"
          items={data.data}
        >
        </Leaderboard>
      ) : (
        <p>Loading...</p>
      )}
 </div> 
      
        </Tab>
        <Tab eventKey="Quiz" title="Quiz" >     

        <div  style={{overflowX:'hidden',overflowY:'auto',overflow:'auto',height:'700px'}}>
    
        {quizList!=0 && <> {quizList.map((quiz,index)=>

   
        <Card border="success" style={{  }}>
             
        <Row>
        
        <Col md="3">
        <img width="200px"src="/image/assignment.svg" alt="" style={{margin:'auto'}}/>
        </Col>
       
        <Col>
         <Card.Body style={{textAlign:'left'}}>
              <Card.Title style={{display:'block'}}>{quiz.title}

            
              
              <span style={{float:'right'}} >

                <Button id="submit-assignment" style={{marginTop:'-4px',fontSize:'12px',fontWeight:'500'}} as={Link} to={`/student/quiz/`+quiz.id}>Start Quiz</Button>
                
              </span>

              
                <span style={{float:'right',marginRight:'10px',color:'green'}} >

               Points: {quiz.total_mark}
                
              </span>
         
              </Card.Title>

             
              <hr />

              <Card.Text><b>Posted date : </b>{quiz.created_date}</Card.Text>
              <Card.Text><b>Posted time : </b>{quiz.created_time}</Card.Text>                   

              <hr />
                
              <Card.Text><b>Due date : </b>{quiz.due_date}</Card.Text>

              <Card.Text><b>Duration : </b>{quiz.duration} minutes</Card.Text>

              

        </Card.Body>
        </Col>
    </Row>
 
 </Card>

   
   
  
   )}
   
      </>}
  
  
      </div>
            </Tab>
           
  
    
    <Tab eventKey="Game" title="Game" > 
     <div  style={{overflowX:'hidden',overflowY:'auto',overflow:'auto',height:'700px'}}>
    
    {hangmanList!=0 && <> {hangmanList.map((hangman,index)=>
    <Card border="success" style={{ marginBottom:'5px' }}>
    <Row>
    <Col md="3">
    <img width="200px"src="/image/hangman-game.png" alt="" style={{margin:'auto'}}/>
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
    </Card>)}<hr/></>}</div></Tab>
  
           
           
     </Tabs>

    



      </div>
    </div>
    
  </section>

  
  </div>)
}

export default CourseTopicStudent