import React from 'react'
import Sidebar from '../Sidebar'
import {Button} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import {Link, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api'
const TopicDetail = () => {
    const[topicDetail, setTopicDetail]=useState([]);
    const {topic_id} = useParams()
  
    useEffect(() =>{ 
  
      try{
       axios.get(baseUrl+'/topic/'+topic_id).then((response)=>{
  
        setTopicDetail(response.data); 
  
       });}
       catch(error){
        console.log(error)
       }
  
     },[]);
  
    const handleDelete = () => {
     Swal.fire({
      title: 'Delete Topic',
      text: 'Are you sure you want to delete',
      icon: 'info',
      confirmButtonText: 'continue',
      showCancelButton: true
     })
    }
  return (
    <div><Button as={Link} to={`/teacher/edit-topic/`+topic_id}></Button>EDIT</div>
  )
}

export default TopicDetail