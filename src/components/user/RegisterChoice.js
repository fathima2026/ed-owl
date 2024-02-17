import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from 'react-bootstrap'
const RegisterChoice = () => {
    const handleSubmit = () => {

    }
    const student = "student"
    const teacher = "teacher"
    return (
      <div className='container' style={{width:'50%',height:'700px',borderRadius:'1px'}}>
  
       <div className='row justify-content-center h-75' style={{paddingTop:'130px'}}>
        <div className='col-md-5' style={{background:'white',borderRadius:'10px',borderColor:'black'}}> 
        <Button style={{marginTop:'50px',}} as={Link} to={`/register/`+student} className='me-1 warning'>
          Student
        </Button>
        <img src="/Image/teacher.png" style={{height:'150px',display:'block',margin:'auto',marginTop:'30px'}}alt="Diccionario Png - Personalised 'owl' Teacher Card@pngkey.com"></img>
        </div>
        <div className='col-md-5 offset-md-2' style={{background:'white',borderRadius:'10px'}}>
        <Button style={{marginTop:'50px'}} as={Link} to={`/register/`+teacher} className='me-1' variant="warning">
          TEACHER
        </Button>
        <img src="/Image/pngwing.com.png" style={{height:'180px',display:'block',margin:'auto',marginLeft:'80px'}}alt="Diccionario Png - Personalised 'owl' Teacher Card@pngkey.com"></img>
  
        </div>
      
  
       </div>
    
  
  
      </div>
    )
}

export default RegisterChoice