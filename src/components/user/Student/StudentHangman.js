import React from 'react'
import Button from 'react-bootstrap/Button';
import Sidebar from '../Sidebar';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import {useState,useEffect} from 'react'
import { Link,useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const baseUrl = 'http://127.0.0.1:8000/api'
const StudentHangman = () => {
        
        const [show, setShow] = useState(false);
        const {hangman_id} = useParams();
        const student_id = localStorage.getItem('id')
        const [hangmanDetail, setHangmanDetail] = useState([]);
        const [detailTab, setDetailTab] = useState(false);
        const [leadershipTab, setLeadershipTab] = useState(false);
        const [SubmissionTab, setSubmissionTab] = useState(false);
        const [submission, setSubmission] = useState(false);

        const [played, setplayed] = useState(false);

        const handleClick= (e) => {
            if(e=='home'){
              setDetailTab(true)
            }else if(e=='Submissions'){
              setSubmissionTab(true)
            }else{
              setLeadershipTab(true)
            }
        }

      useEffect(()=>{

        try{
          axios.get(baseUrl+'/hangman/'+hangman_id).then((response)=>{
     
           setHangmanDetail(response.data)
           
     
          });}
          catch(error){
           console.log(error)
          }

      },[detailTab])

      useEffect(()=> {

        try{
          
          axios.get(baseUrl+'/fetch-hangman-status/'+student_id+'/'+hangman_id).then((response)=>{
          
            setplayed(response.data.bool)

            if(response.data.bool){

              try{

                axios.get(baseUrl+'/hangman-submissions/'+student_id+'/'+hangman_id).then((response)=>{

                  setSubmission(response.data[0])
                  console.log(response.data)

                });
                

              }catch{

              }
            

            }

           

          })
        
        }catch(error){

          console.log(error)

        }},[]);
      
      return (
        <div className='row' style={{height:'auto'}}>
        <aside className='col-3'>
        <Sidebar/>
        </aside>
        <section className='col-8' style={{backgroundColor: '#eee',height:'auto'}}>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3" onSelect={(e) => handleClick(e)}>
          <Tab eventKey="home" title="Game Detail">
           <section style={{textAlign:'left'}}>
              <Card style={{ height: 'auto' }}>
               <Card.Body>
              <Card.Title style={{display:'block'}}>Title:{hangmanDetail.title} 
              <span style={{float:'right'}}>

                {played ? <p>Score: {submission.marks}/{hangmanDetail.total_mark} </p> : 
              
              <Button  as={Link} to={`/student/play-hangman/`+hangman_id}
              id="submit-assignment"style={{borderRadius:'5px',backgroundColor:'#FFDA33'}}>Play now</Button >}
                
              </span></Card.Title>
              <hr />
            <Card.Subtitle style={{color:'green'}}className="mb-2">Date posted : {hangmanDetail.created_date}</Card.Subtitle>
            <Card.Subtitle className="mb-2">Total marks : {hangmanDetail.total_mark} </Card.Subtitle>
    
            <hr />
            <Card.Subtitle className="mb-2">Instructions : For every word, Hint is given at the top, using the hint try to get the word right, each word has a mark </Card.Subtitle>
    
            <Card.Subtitle>
              <hr />
            {submission != null ? <p>Completed Time and Date: {submission.completed_time} <hr />Completed date : {submission.completed_date}</p> : null}
            </Card.Subtitle>
                    
            <hr />     
         

          </Card.Body>
           </Card>
            
           </section>
          </Tab>
          <Tab eventKey="Submissions" title="Game Submissions" >
          <Card border="success" style={{  }}>
           
           <Row>
               <Col md="3">
                <img width="200px"src="/image/assignment.svg" alt="" style={{margin:'auto'}}/>
               </Col>
               <Col>
                 <Card.Body style={{textAlign:'left'}}>
                      <Card.Title style={{display:'block'}}>{}
                      
                      <span style={{float:'right'}} >

                        <button id="submit-assignment"  style={{borderRadius:'5px',backgroundColor:'4BB543'}} disabled></button>
                        
                      </span>

                      {/* {mysubmissionData.marks!=null && <>
                        <span style={{float:'right',marginRight:'10px',color:'green'}} >

                       Graded: {mysubmissionData.marks}/{mysubmissionData.assignment.total_mark}
                        
                      </span>
                      </>} */}

                    
                      
                      </Card.Title>
                      <hr />
                      <Card.Text><b>Submission date : </b></Card.Text>
                      <Card.Text><b>Submission time : </b></Card.Text>                   

                      <hr />

                </Card.Body>
                </Col>
            </Row>
         
         </Card>
          </Tab>
          <Tab eventKey="LeaderBoard" title="LeaderBoard">
   
          </Tab>
        </Tabs>
        </section>
    
        </div>
       )
}

export default StudentHangman