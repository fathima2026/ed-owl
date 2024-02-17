import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Sidebar from '../Sidebar';
import axios from 'axios';
import {useState} from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import "./style.css"
const baseUrl = 'http://127.0.0.1:8000/api/assignment/'

const AddAssignment = () => {

  const {module_id} = useParams()
  const [assignmentData, setAssignmentData] = useState({

    title: '',
    description: '',
    file: '',
    image: '',
    total_mark:'',
    module:''

  });

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
    
    console.log(assignmentData.file.name)

    assignmentFormData.append("title", assignmentData.title)
    assignmentFormData.append("description", assignmentData.description)
    assignmentFormData.append("file", assignmentData.file,assignmentData.file.name)
    assignmentFormData.append("image", assignmentData.image,assignmentData.image.name)
    assignmentFormData.append("total_mark", assignmentData.total_mark)
    assignmentFormData.append("module", module_id)

    event.preventDefault()
    
try{
    axios.post(baseUrl,assignmentFormData,{
      headers:{
        'content-type':'multipart/form-data'
      }
    }).then((response)=>{
      
      console.log(response.data)
      event.preventDefault()

  
        Swal.fire({
          
          title: 'Assignment added successfully',
          icon: 'success',
          toast:true,
          timer:3000,
          timerProgressBar: true,
          showConfirmButton: false
  
         })
      
    

      setAssignmentData({

        title: '',
        description: '',
        file: '',
        image: '',
        total_mark:'',
        module:'',
    
        status:'success'
  

    });
    })}catch(err) {
      event.preventDefault()

      console.log(err);
    }; 
  }
  return (
    <div className="row">
    <aside className='col-3'>
    <Sidebar/>
    </aside>
    <section className='py-10 col-8 m-3 form-section'>
    <Form className="py-4 form-tag">
      <Form.Group className="mb-3">
        <Form.Label className='form-text'>Assignment Title</Form.Label>
        <Form.Control onChange={handleChange} value={assignmentData.title} type="text" placeholder="Enter Assignment Title" name="title" required/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='form-text'>Assignment Description</Form.Label>
        <Form.Control onChange={handleChange} value={assignmentData.description} type="text" placeholder="Enter Assignment Title" name="description"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='form-text'>Document</Form.Label>
        <Form.Control onChange={handleFileChange} type="file" placeholder="Upload Document" name="file"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='form-text'>Image</Form.Label>
        <Form.Control onChange={handleFileChange} type="file" placeholder="Upload Image" name="image"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='form-text'>Total mark</Form.Label>
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

export default AddAssignment