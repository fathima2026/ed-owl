import React from 'react'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Viewer from './Viewer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Sidebar from '../Sidebar';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

const baseUrl = 'http://127.0.0.1:8000/api'
const ViewAssignment = () => {

  const {assignment_id} = useParams();


  const [show, setShow] = useState(false);


  const [assignmentData, setAssignmentData] = useState({
  
        title: '',
        description: '',
        file: '',
        image: '',
        total_mark:'',
        created_time:'',
        created_date:'',
        module:''
    
      });

  const [submissionsData, setSubmissionsData] = useState([])

  const [updateSubmissionsData, setUpdateSubmissionsData] = useState({
        
        id: '',
        assignment:'',
        student:'',
        marks: '',
        remarks:''

      })
      
  
  useEffect(() =>{ 
          //list of assignment submission
          try{
           
            axios.get(baseUrl+'/assignment-submissions/'+assignment_id).then((response)=>{

                      setSubmissionsData(response.data);


            })


          }catch(e){

                       console.log(e)

          }
          //detail of assignment
          try{
           axios.get(baseUrl+'/teacher-assignment-detail/'+assignment_id).then((response)=>{

            let d = new Date(response.data.created_date)
            let date = d.toLocaleDateString();
            let t = new Date(response.data.created_time);
            const time = new Date(response.data.created_time).toLocaleTimeString('en',
                 { timeStyle: 'short', hour12: false, timeZone: 'UTC' })
            setAssignmentData( 
                {
                 title: response.data.title,
                 description: response.data.description,
                 file: response.data.file,
                 image:response.data.image,
                 total_mark:response.data.total_mark,
                 created_time:time,
                 created_date:date,
                 module:response.data.module
                }

            ); 

           });}
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

  //handling grade submission

  const handleGrade=(submission_id)=>{

    
    try{
      axios.get(baseUrl+'/submissions/'+submission_id).then((response)=>{
    
        setUpdateSubmissionsData( 
            {
              id: response.data.id,
              assignment:response.data.assignment,
              student:response.data.student,
              marks: response.data.marks,
              remarks:response.data.remarks
            }
        ); 
  
       });}
       catch(error){
        console.log(error)
       }

       setShow(true)


  }

  const handleChange=(event) => {
    console.log(event.target.name,event.target.value)
    setUpdateSubmissionsData({
      ...updateSubmissionsData,
      [event.target.name]:event.target.value
    })
  }

  const handleClose = () => setShow(false);

  const handleSubmit = (event) => {
    
    setShow(false);
   
    if(updateSubmissionsData.marks!=null){
    const gradeFormData = new FormData();

    gradeFormData.append("assignment",updateSubmissionsData.assignment)
    gradeFormData.append("student", updateSubmissionsData.student)
    gradeFormData.append("marks", updateSubmissionsData.marks)
    gradeFormData.append("remarks", updateSubmissionsData.remarks)

    try{
      axios.put(baseUrl+'/submissions/'+updateSubmissionsData.id+'/',gradeFormData).then((response)=>{
        
        console.log(response.data)
        event.preventDefault()
  
        if(response.status == 200){
          Swal.fire({
          
            title: 'GRADE HAS BEEN UPDATED SUCCESSFULLY',
            icon: 'success',
            toast:true,
            timer:3000,
            timerProgressBar: true,
            showConfirmButton: false
    
           })
        }
        setUpdateSubmissionsData({
          
          id: '',
          assignment:'',
          student:'',
          marks: '',
          remarks:''
    
  
      });
      }) } catch(e){
       console.log(e);
       
      } }
    }






      
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
          <Card.Title>Title: {assignmentData.title}</Card.Title>
          <hr />
        <Card.Subtitle style={{color:'green'}}className="mb-2">Date and Time posted : {assignmentData.created_date}, {assignmentData.created_time}</Card.Subtitle>
        
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
                      <Card.Title style={{display:'block'}}>{submission.assignment.title}
                      
                      <span style={{float:'right'}} >

                        {!submission.is_graded && <>
                          <button id="submit-assignment" onClick={()=>handleGrade(submission.id)} style={{borderRadius:'5px',backgroundColor:'#0765c3'}}>Grade</button>
                        </>}
                        {submission.is_graded && <>
                          <button id="submit-assignment" onClick={()=>handleGrade(submission.id)} style={{borderRadius:'5px',backgroundColor:'#fcb134'}}>Update</button>
                        </>}

                      </span>

                      {submission.marks!=null && <>
                        <span style={{float:'right',marginRight:'10px',color:'green'}} >

                       Graded: {submission.marks}/{submission.assignment.total_mark}
                        
                      </span>
                      </>}

                    
                      
                      </Card.Title>
                      <hr />
                      <Card.Text><b>Assignment : </b><a href={submission.file} target='_blank'>Download Attached File</a></Card.Text>

                      <Card.Text><b>Submission date : </b>{submission.completed_date}<span style={{float:'right',textAlign:'left'}}><b>Submitted by : </b>{submission.student.email}</span></Card.Text>
                      <Card.Text><b>Submission time : </b>{submission.completed_time}<span style={{float:'right',textAlign:'left'}}><b>Student name : </b> {submission.student.first_name} {submission.student.last_name}</span></Card.Text>                   

                      <hr />

                      {submission.remarks!=null && <>

                        <Card.Text><b>Remarks : </b> {submission.remarks}</Card.Text>

                      </>}

                </Card.Body>
                </Col>
            </Row>
         
         </Card>
         <hr />
         </div>
                
         )}
         

         <Modal show={show} onHide={handleClose}>
          <Modal.Header>
          <img  width="280px"src="/image/baselogo.svg" alt="" style={{margin:'auto'}}/>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3">
          <Form.Label>Marks</Form.Label>
          <Form.Control  onChange={handleChange} type="number" placeholder="marks" name="marks"/>
          </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Remarks</Form.Label>
              <Form.Control onChange={handleChange} as="textarea" name="remarks" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" style={{width:'30%', margin:'auto'}} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button size="sm" style={{width:'30%', margin:'auto'}} variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </Tab>

      <Tab eventKey="Assignment" title="Assignment files" >
          <DocViewer documents={docs} style={{width: 800, height: 700, margin: 'auto'}} pluginRenderers={DocViewerRenderers} />;
      </Tab>
    </Tabs>
    </section>

    </div>
   )
}

export default ViewAssignment