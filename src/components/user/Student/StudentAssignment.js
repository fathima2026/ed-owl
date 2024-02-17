import React from 'react'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Sidebar from '../Sidebar';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const baseUrl = 'http://127.0.0.1:8000/api'
const StudentAssignment = () => {
        
        const [show, setShow] = useState(false);

        const handleShow = () => setShow(true);
        const {assignment_id} = useParams();
        const student_id = localStorage.getItem('id')


        const [assignmentSubmissionData, setAssignmentSubmissionData] = useState({
  
            assignment: '',
            student: '',
            file: '',
        
          });

        const [assignmentData, setAssignmentData] = useState({
           
            title: '',
            description: '',
            file: '',
            image:'',
            total_mark:'',
            created_time:'',
            module:''
        
          });

        const [mysubmissionData,setMySubmissionData] = useState({

          assignment:'',
          file: '',
          completed_time: '',
          completed_date: '',
          marks: '',
          remarks: ''

        });


       

          
        const handleFileChange=(event) => {
          console.log(event.target.name,event.target.value)
          setAssignmentSubmissionData({
            ...assignmentSubmissionData,
            [event.target.name]:event.target.files[0]
          })
        }

        const handleClose = (event) => {          
        
          setShow(false);
      
          if(assignmentSubmissionData.file){
          
            try{
              axios.get(baseUrl+'/fetch-submission-status/'+student_id+'/'+assignment_id).then((response)=>{
              
                if(response.data.bool){
                  console.log(response.data.bool);
                  alert("You have already submitted this assignment");
                }else{
        
                  const assignmentSubmitFormData = new FormData();
        
                  assignmentSubmitFormData.append("assignment", assignment_id)
                  assignmentSubmitFormData.append("student", student_id);
                  assignmentSubmitFormData.append("file",assignmentSubmissionData.file,assignmentSubmissionData.file.name);
                 
                  try{
                    axios.post(baseUrl+'/submit-assignment/',assignmentSubmitFormData).then((response)=>{
                      console.log(response)
                      Swal.fire({
                    
                        title: 'Submitted Successfully',
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
          else{
            
              alert("Submit the file")
          
          }
        
          }
     
      
      
          
        
          
            useEffect(() =>{ 
          
              try{
               axios.get(baseUrl+'/assignment/'+assignment_id).then((response)=>{
          
                setAssignmentData( 
                    {
                     title: response.data.title,
                     description: response.data.description,
                     file: response.data.file,
                     image:response.data.image,
                     total_mark:response.data.total_mark,
                     created_time:response.data.created_time,
                     module:response.data.module
                    }
                ); 
          
               });}
               catch(error){
                console.log(error)
               }

               //fetching students own submission

               try{
                axios.get(baseUrl+'/fetch-submission-status/'+student_id+'/'+assignment_id).then((response)=>{
                
                  if(response.data.bool){
                    
                    axios.get(baseUrl+'/assignment-submissions/'+student_id+'/'+assignment_id).then((response)=>{

                      console.log(response.data)
                      setMySubmissionData(
                          {
                          assignment: response.data[0].assignment,
                          file: response.data[0].file,
                          marks:  response.data[0].marks,
                          remarks: response.data[0].remarks,
                          completed_date: response.data[0].completed_date,
                          completed_time: response.data[0].completed_time
                        }
                        ); })
               }})}
                  
                  catch(error){

                     console.log(error)

                  }

                
               


              

          
             },[]);
    
      
         //setting the files for viewing on react viewer
         const fname = assignmentData.file
         const extension = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);

         const docs = [

          { uri: assignmentData.image,
           }, 
           {
            uri: assignmentData.file,
            fileType: extension
           }// Local File
       
        ];
      return (
        <div className='row' style={{height:'auto'}}>
        <aside className='col-2'>
        <Sidebar/>
        </aside>
        <section className='col-10' style={{backgroundColor: 'white',height:'auto'}}>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="home" title="Assignment Detail">
           <section style={{textAlign:'left'}}>
              <Card style={{ height: 'auto' }}>
               <Card.Body>
              <Card.Title style={{display:'block'}}>Title: {assignmentData.title} <span style={{float:'right'}}><button onClick={handleShow} id="submit-assignment"style={{borderRadius:'5px',backgroundColor:'#FFDA33'}}>Submit now</button></span></Card.Title>
              <hr />
            <Card.Subtitle style={{color:'green'}}className="mb-2">Date posted : {assignmentData.created_time}</Card.Subtitle>
            <Card.Subtitle className="mb-2">Total marks : {assignmentData.total_mark}</Card.Subtitle>
    
            <hr />
            <Card.Subtitle className="mb-2">Description : </Card.Subtitle>
    
            <Card.Text>
             {assignmentData.description}
            </Card.Text>
                    
            <hr />
            <Card.Text>
                   Download fies : <br />
                   {assignmentData.image && <>
                   <a href={assignmentData.image} target='_blank'>Download Attached Image</a>
                  </>} <br />
                   {assignmentData.file && <>
                   <a href={assignmentData.file} target='_blank'>Download Attached File</a>
                  </>}
            </Card.Text>        
         

          </Card.Body>
        </Card>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3">
          <Form.Label>Document</Form.Label>
          <Form.Control onChange={handleFileChange} type="file" placeholder="Upload Document" name="file"/>
          </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" style={{width:'30%', margin:'auto'}} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button size="sm" style={{width:'30%', margin:'auto'}} variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        

         {/* <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />; */}
    
           </section>
          </Tab>
          <Tab eventKey="Assignment" title="Assignment files" >
          <DocViewer documents={docs} style={{width: 800, height: 700, margin: 'auto'}} pluginRenderers={DocViewerRenderers} />;
          </Tab>
          <Tab eventKey="Submissions" title="Submissions">
          <Card border="success" style={{  }}>
           
           <Row>
               <Col md="3">
                <img width="200px"src="/image/assignment.svg" alt="" style={{margin:'auto'}}/>
               </Col>
               <Col>
                 <Card.Body style={{textAlign:'left'}}>
                      <Card.Title style={{display:'block'}}>{assignmentData.title}
                      
                      <span style={{float:'right'}} >

                        <button id="submit-assignment" onClick={handleShow} style={{borderRadius:'5px',backgroundColor:'4BB543'}} disabled>Submit Again</button>
                        
                      </span>

                      {mysubmissionData.marks!=null && <>
                        <span style={{float:'right',marginRight:'10px',color:'green'}} >

                       Graded: {mysubmissionData.marks}/{mysubmissionData.assignment.total_mark}
                        
                      </span>
                      </>}

                    
                      
                      </Card.Title>
                      <hr />
                      <Card.Text><b>Assignment : </b><a href={mysubmissionData.file} target='_blank'>Download Attached File</a></Card.Text>

                      <Card.Text><b>Submission date : </b>{mysubmissionData.completed_date}</Card.Text>
                      <Card.Text><b>Submission time : </b>{mysubmissionData.completed_time}</Card.Text>                   

                      <hr />

                      {mysubmissionData.remarks!=null && <>

                        <Card.Text><b>Remarks : </b> {mysubmissionData.remarks}</Card.Text>

                      </>}

                </Card.Body>
                </Col>
            </Row>
         
         </Card>
          </Tab>
   
        </Tabs>
        </section>
    
        </div>
       )
}

export default StudentAssignment