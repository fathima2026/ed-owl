
import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Sidebar from '../Sidebar';
import axios from 'axios';
import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api'

const EditAssignment = () => {
    const [assignmentData, setAssignmentData] = useState({
  
      title: '',
      description: '',
      file: '',
      image: '',
      total_mark:'',
      module:''
  
    });
    
      const {assignment_id} = useParams();
    
      useEffect(() =>{ 
    
        try{
         axios.get(baseUrl+'/teacher-assignment-detail/'+assignment_id).then((response)=>{
    
          setAssignmentData( 
              {
               title: response.data.title,
               description: response.data.description,
               file: response.data.file,
               image:response.data.image,
               total_mark:response.data.total_mark,
               module:response.data.module
              }
          ); 
    
         });}
         catch(error){
          console.log(error)
         }
    
       },[]);
    
      const handleChange=(event) => {
        console.log(event.target.name,event.target.value)
        setAssignmentData({
          ...assignmentData,
          [event.target.name]:event.target.value
        })
      }

      const handleFileChange=(event) => {
        console.log(event.target.name,event.target.value)
        setAssignmentData({
          ...assignmentData,
          [event.target.name]:event.target.files[0]
        })
      }
    
      const submitForm=(event) => {
        const assignmentFormData = new FormData();
    

        assignmentFormData.append("title", assignmentData.title)
        assignmentFormData.append("description", assignmentData.description)
        assignmentFormData.append("file", assignmentData.file,assignmentData.file.name)
        assignmentFormData.append("image", assignmentData.image,assignmentData.image.name)
        assignmentFormData.append("total_mark", assignmentData.total_mark)
        assignmentFormData.append("module", assignmentData.module)
    
        event.preventDefault()
        
        try{
        axios.put(baseUrl+'/teacher-assignment-detail/'+assignment_id,assignmentFormData,{
            headers:{
              'content-type':'multipart/form-data'
            }
          }).then((response)=>{
          
          console.log(response.data)
          event.preventDefault()
    
          if(response.status == 200){
            Swal.fire({
            
              title: 'DATA HAS BEEN UPDATED SUCCESSFULLY',
              icon: 'success',
              toast:true,
              timer:3000,
              timerProgressBar: true,
              showConfirmButton: false
      
             })
          }
          setAssignmentData({
    
            title: '',
            description: '',
            file: '',
            image: '',
            total_mark:'',
            module:'',
            status:'success'
      
    
        });
        }) }catch(e){
         console.log(e);
         setAssignmentData({status:'e'})
        }
      }
  return (
    <div className="row">
    <aside className='col-3'>
    <Sidebar/>
    </aside>
    <section className='py-10 col-8 m-3' style={{backgroundColor: '#eee', borderRadius:'5px'}}>
    <Form className="py-4"  style={{width:'50%', margin:'auto'}}>
      <Form.Group className="mb-3">
        <Form.Label>Assignment Title</Form.Label>
        <Form.Control onChange={handleChange} value={assignmentData.title} type="text" placeholder="Enter Assignment Title" name="title" required/>
      </Form.Group>
      <Form.Group className="mb-3"controlId="exampleForm.ControlTextarea1">
        <Form.Label>Assignment Description</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={handleChange} value={assignmentData.description} type="text" placeholder="Enter Assignment Title" name="description"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Document</Form.Label>
        <Form.Control onChange={handleFileChange} type="file" placeholder="Upload Document" name="file"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control onChange={handleFileChange} type="file"  placeholder="Upload Image" name="image"/>
        
          <img src={assignmentData.image} alt="" /> 
       
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Total mark</Form.Label>
        <Form.Control onChange={handleChange} value={assignmentData.total_mark} type="number" placeholder="Total Mark" name="total_mark"/>
      </Form.Group>
      <Button onClick={submitForm} variant="primary" type="submit">
        Add
      </Button>
    </Form>
    </section>
    </div>
  )
}

export default EditAssignment