import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
const baseUrl = 'http://127.0.0.1:8000/api'
const List = () => {
  const [teacher,setTeacher] = useState(null)
  useEffect(()=>{
    axios.get(baseUrl+'/teacher/').then((response)=>{
        setTeacher(response.data)
    })
  })
  return (
    <div>List</div>
  )
}

export default List