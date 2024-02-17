import React from 'react'
import Button from 'react-bootstrap/Button';
import Sidebar from '../Sidebar';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const baseUrl = 'http://127.0.0.1:8000/api'

const ViewQuiz = () => {    
    const {quiz_id} = useParams();
    const [quizData, setQuizData] = useState({
    
          title: '',
          quiz: '',
          total_mark:'',
          created_time:'',
          created_date:'',
          due_date:'',
          durations:'',
      
        });
  
    const [submissionsData, setSubmissionsData] = useState([])
 
    useEffect(() =>{ 
            //list of assignment submission
            try{
             
              axios.get(baseUrl+'/quiz-submissions/'+quiz_id).then((response)=>{
  
                        setSubmissionsData(response.data);
  
  
              })
  
  
            }catch(e){
  
                         console.log(e)
  
            }
            //detail of assignment
            try{
             axios.get(baseUrl+'/quiz/'+quiz_id).then((response)=>{
  
              let d = new Date(response.data.created_date)
              let date = d.toLocaleDateString();
              let t = new Date(response.data.created_time);
              const time = new Date(response.data.created_time).toLocaleTimeString('en',
                   { timeStyle: 'short', hour12: false, timeZone: 'UTC' })
              setQuizData( 
                  {
                   title: response.data.title,
                   quiz: response.data.quiz,
                   total_mark:response.data.total_mark,
                   created_time:time,
                   created_date:date,
                   due_date:response.data.due_date,
                   duration:response.data.duration
                  }
  
              ); 
  
             });}
             catch(error){
              console.log(error)
             }
        
           },[]);
  
    return (
      <div className='row' style={{height:'auto'}}>
      <aside className='col-2'>
      <Sidebar/>
      </aside>
      <section className='col-10' style={{backgroundColor: 'white'}}>
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="home" title="Assignment Detail">
         <section style={{textAlign:'left'}}>
            <Card style={{ height: 'auto' }}>
             <Card.Body>
            <Card.Title>Title: {quizData.title}</Card.Title>
            <hr />
          <Card.Subtitle style={{color:'green'}}className="mb-2">Date and Time posted : {quizData.created_date}, {quizData.created_time}</Card.Subtitle>
          
          <Card.Subtitle className="mb-2">Total marks : {quizData.total_mark}</Card.Subtitle>
        </Card.Body>
     
      </Card>

      {quizData.quiz && <>
      
      <Card>
       
       <Card.Body>
       <Card.Title>Questions</Card.Title>
       {quizData.quiz.map((item,index)=>
         <Card.Text>
             Q{index+1}- {item.question} <br />
            Options: {item.options.join(" , ")} <br />
            Correct Answer : {item.correctAnswer} <hr />
        </Card.Text>
            )}
       </Card.Body>
    </Card>
      </>}
     
    
  
         </section>
        </Tab>
       
       
        <Tab eventKey="Submissions" title="Submissions">
        {submissionsData.map((submission,index)=> 
  
          <div>
           <Card border="success" style={{  }}>
             
             <Row>
                 <Col md="3">
                  <img width="200px"src="/image/assignment.svg" alt="" style={{margin:'auto'}}/>
                 </Col>
                 <Col>
                   <Card.Body style={{textAlign:'left'}}>
                        <Card.Title style={{display:'block'}}>{submission.quiz.title}
                        
                        <span style={{float:'right'}} >
  
                          <button id="submit-assignment" style={{borderRadius:'5px',backgroundColor:'4BB543'}}>Grade</button>
                          
                        </span>
  
                      
                        <span style={{float:'right',marginRight:'10px',color:'green'}} >
  
                         Graded: {submission.marks}/{submission.quiz.total_mark}
                          
                        </span>
                     
  
                      
                        
                        </Card.Title>
                        <hr />
  
                        <Card.Text><b>Submission date : </b>{submission.completed_date}<span style={{float:'right',textAlign:'left'}}><b>Submitted by : </b>{submission.student.email}</span></Card.Text>
                        <Card.Text><b>Submission time : </b>{submission.completed_time}<span style={{float:'right',textAlign:'left'}}><b>Student name : </b> {submission.student.first_name} {submission.student.last_name}</span></Card.Text>                   
  
                        <hr />
  
                  </Card.Body>
                  </Col>
              </Row>
           
           </Card>
           <hr />
           </div>
                  
           )}

        </Tab>
  
        
      </Tabs>
      </section>
  
      </div>
  )
}

export default ViewQuiz