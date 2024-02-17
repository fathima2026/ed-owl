import React from 'react'
import {Link, useParams} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Sidebar from '../Sidebar';
import axios from 'axios';
import {useState, useEffect } from 'react'
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api'
const EditTopic = () => {
    const {topic_id} = useParams()
    const [topicData, setTopicData] = useState({
  
      course:'',
      title: '',
      module: '',
      
  
    });
  
    const handleChange=(event) => {
      console.log(event.target.name,event.target.value)
      setTopicData({
        ...topicData,
        [event.target.name]:event.target.value
      })
    }

    useEffect(() =>{ 

        try{
         axios.get(baseUrl+'/topic/'+topic_id).then((response)=>{
    
          setTopicData(response.data); 
    
         });}
         catch(error){
          console.log(error)
         }
    
       },[]);
  
      const submitForm=(event) => {
      const topicFormData = new FormData();
      
      topicFormData.append("title", topicData.title)
      topicFormData.append("module", topicData.module)
  
      event.preventDefault()
      
      try{
      axios.put(baseUrl+'/topic/'+topic_id+'/',topicFormData).then((response)=>{
        
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
       



      }) }catch(e){
       console.log(e);
       setTopicData({status:'e'})
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
        <Form.Label>Topic Name</Form.Label>
        <Form.Control onChange={handleChange} value={topicData.title} type="text" name="title" placeholder="Enter topic Name" />
      </Form.Group>
      
      <Button  onClick={submitForm}  variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </section>
    </div>
    
  )
}

export default EditTopic