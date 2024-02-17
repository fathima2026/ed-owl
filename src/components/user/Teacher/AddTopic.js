import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Sidebar from '../Sidebar';
import axios from 'axios';
import {useState} from 'react'

import {Link, useParams} from 'react-router-dom'
const baseUrl = 'http://127.0.0.1:8000/api/topic/'
const AddTopic = () => {
  const {module_id} = useParams()
  const [topicData, setTopicData] = useState({

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

  const submitForm=(event) => {
    const topicFormData = new FormData();
    
    topicFormData.append("title", topicData.title)
    topicFormData.append("module", module_id)

    event.preventDefault()
    
    try{
    axios.post(baseUrl,topicFormData).then((response)=>{
      
      console.log(response.data)
      event.preventDefault()

      setTopicData({

        title: '',
        module: '',
        
        status:'success'
  

    });
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

export default AddTopic