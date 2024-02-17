import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Sidebar from '../Sidebar'
import {Button} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import {Link, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api'
const HangmanDashboard = () => {

const {hangman_id} = useParams()
const [hangmanList, setHangmanList] = useState([])
const [submissionsList, setSubmissionsList] = useState([])



useEffect(()=>{
  
try{

  axios.get(baseUrl+'/hangman-submissions/'+hangman_id).then((response)=>{

     setSubmissionsList(response.data)
     console.log(submissionsList)

  })

}catch(error){
    console.log(error)
}

},[])


  
  
  function handleClick(e) {
        console.log(e);   
    }


   
return (
    <>
    <div className="row" style={{marginBottom:'20px'}}>
    <aside className='col-3'>
    <Sidebar/>
    </aside>
    
    <section className='col-8' style={{backgroundColor: '#eee'}}>
   

    <Tabs defaultActiveKey="home" id="justify-tab-example" className="mb-3" justify onSelect={(e) => handleClick(e)}>
  
      <Tab eventKey="home" title="Hangman Quizes">

      <div  style={{overflowX:'hidden',overflowY:'auto',overflow:'auto',height:'700px'}}>
    
    {submissionsList!=0 && <> {submissionsList.map((submission,index)=>
    <Card border="success" style={{ marginBottom:'5px' }}>
    <Row>
    <Col md="3">
    <img width="200px"src="/image/hangman-game.png" alt="" style={{margin:'auto'}}/>
    </Col>
    <Col>
     <Card.Body style={{textAlign:'left'}}>
          <Card.Title style={{display:'block'}}>{submission.hangman.title}
          <span style={{float:'right'}} >
          </span>
          <span style={{float:'right',marginRight:'10px',color:'green'}} >Total Points: {submission.hangman.total_mark}</span>
          </Card.Title>
          <Card.Text>Student Name : {submission.student.first_name} {submission.student.last_name} </Card.Text>
          <Card.Text>Student Email : {submission.student.email}</Card.Text>
          <Card.Text>Points obtained by student : {submission.marks}</Card.Text>
          <Card.Text><b>Game date and time : </b>{submission.hangman.created_date} at {submission.hangman.created_time}</Card.Text>
          <Card.Text><b>Game completed date and time : </b>{submission.completed_date} at {submission.hangman.completed_time}</Card.Text>
      </Card.Body>
    </Col>
    </Row>
    </Card>)}<hr/></>}</div>
          
      </Tab>
      <Tab eventKey="submissions" title="submissions">

      </Tab>
      <Tab eventKey="leadership" title="leadership board">

     </Tab>

    </Tabs> 
    
    </section>
    
    </div>
    </>
  )
}

export default HangmanDashboard