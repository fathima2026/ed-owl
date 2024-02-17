import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Sidebar from '../Sidebar';
import axios from 'axios';
import {useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom';
const baseUrl = 'http://127.0.0.1:8000/api'

const EditModule = () => {
  const [moduleData, setModuleData] = useState({

    title: '',
    description: '',
    teacher: '',
    code:'',

  });

  const {module_id} = useParams();

  useEffect(() =>{ 

    try{
     axios.get(baseUrl+'/teacher-module-detail/'+module_id).then((response)=>{

      setModuleData( 
     {title: response.data.title,
      description: response.data.description,
      teacher: response.data.teacher,
      code:response.data.code}
      ); 

     });}
     catch(error){
      console.log(error)
     }

   },[]);

  const handleChange=(event) => {
    console.log(event.target.name,event.target.value)
    setModuleData({
      ...moduleData,
      [event.target.name]:event.target.value
    })
  }

  const submitForm=(event) => {
    const moduleFormData = new FormData();
    
    moduleFormData.append("title", moduleData.title)
    moduleFormData.append("description", moduleData.description)
    moduleFormData.append("teacher", 1)
    moduleFormData.append("code", moduleData.code)

    event.preventDefault()
    
    try{
    axios.put(baseUrl+'/teacher-module-detail/'+module_id,moduleFormData).then((response)=>{
      
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
      setModuleData({

        title: '',
        description: '',
        teacher: '',
        code:'',
        status:'success'
  

    });
    }) }catch(e){
     console.log(e);
     setModuleData({status:'e'})
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
        <Form.Label>Module Title</Form.Label>
        <Form.Control onChange={handleChange} value={moduleData.title} type="text" placeholder="Enter Module Name" name="title"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control onChange={handleChange} value={moduleData.description} type="text" placeholder="description" name="description"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>code</Form.Label>
        <Form.Control onChange={handleChange} value={moduleData.code} type="text" placeholder="code" name="code"/>
      </Form.Group>
      <Button onClick={submitForm} variant="primary" type="submit">
        Add
      </Button>
    </Form>
    </section>
    </div>
    
  )
}

export default EditModule