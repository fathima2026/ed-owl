import React from 'react'
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBCard,
  MDBCardBody
}
from 'mdb-react-ui-kit';
const baseUrl = 'http://127.0.0.1:8000/api/'

const Login = () => {

  const { setAuth } = useAuth();
  const {role} = useParams();

  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [email, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const studentFormData = new FormData;
      studentFormData.append('email',email)
      studentFormData.append('password',pwd)

      
        const response = await axios.post(baseUrl+role+'/login',studentFormData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        e.preventDefault();

   
       console.log(response)

        if(response.data.bool == true){
          e.preventDefault();

                  localStorage.setItem('studentLoginStatus', true)
                  localStorage.setItem('id', response.data.id)
                  localStorage.setItem('first_name', response.data.first_name)

                  console.log(JSON.stringify(response?.data));
                  console.log(JSON.stringify(response));
                  
                  const accessToken = response?.data?.access;
                  const refreshToken = response?.data?.refresh;

                  console.log(accessToken);
                 
                  const is_student = response?.data?.is_student;
                  const is_teacher = response?.data?.is_teacher;
                  const is_staff = response?.data?.is_staff;
                  const roles = []
                  
                  const page = ''

                  if(is_student){
                     roles[0] = "student"
                  }else if(is_teacher){
                    roles[0] = "teacher"

                  }else if(is_staff){
                    roles[0]="staff"
                  }else{
                    roles[0]="user"
                  }

                  console.log(roles)
                  let role = roles[0];
                  console.log(role)
                  localStorage.setItem('role', role)
                  localStorage.setItem('refreshToken',refreshToken)
                  setAuth({ email, pwd, roles, accessToken, refreshToken });
                  setEmail('');
                  setPwd('');
                  
                  if(role=="user"){
                    navigate('/unauthorized')
                  }else if(role=="staff"){
                    navigate('/user')
                  }
                  else{
               
                  window.location.href='/'+role+'/courses'

                  }
                  }
                else{
                  setErrMsg("Invalid Email or Password")
         
                }

    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
}



//  const [studentLoginData, setStudentLoginData]=useState({
//   email: '',
//   password: ''
//  });

//  const [errorMsg, setErrorMsg] = useState('');

//  const handleChange = (event)=>{
//   setStudentLoginData({
//     ...studentLoginData,[event.target.name]:event.target.value
//   })
// }

//  const submitForm = (event)=>{
//     const studentFormData = new FormData;
//     studentFormData.append('email',studentLoginData.email)
//     studentFormData.append('password',studentLoginData.password)
//     try{
//       axios.post(baseUrl+'/student-login',studentFormData).then((response)=>{
//       console.log(response)
//       if(response.data.bool == true){
//         localStorage.setItem('studentLoginStatus', true)
//         localStorage.setItem('id', response.data.id)
//         window.location.href = '/dashboard'
//       }else{
//         setErrorMsg("Invalid Email or Password")
//       }
//     })}catch(error){
//       console.log(error)
//     }
     
//   }
 
//  const studentLoginStatus = localStorage.getItem('studentLoginStatus')
//  if(studentLoginStatus){
//   window.location.href = '/dashboard'
//  }

  return (
   
    <MDBContainer fluid>

    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol col='12'>

        <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
          <MDBCardBody className='p-5 w-100 d-flex flex-column'>
            {/* {errorMsg && <><p className='text-danger'>{errorMsg}</p></>} */}
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h2 className="fw-bold mb-2 text-center">Sign in</h2>
            <p className="text-white-50 mb-3">Please enter your login and password!</p>

            <MDBInput name='email' 
            wrapperClass='mb-4 w-100'
             id='formControlLg' type='email' 
             size="lg"  
             
             ref={userRef}
             autoComplete="off"
             onChange={(e) => setEmail(e.target.value)}
             value={email}
             requiredwrapperClass='mb-4 w-100' 
             label='Email address'
            />


           <MDBInput name='password' wrapperClass='mb-4 w-100' 
           label='Password' id='formControlLg' 
            size="lg"  type="password"
           
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required/>

            <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password'style={{backgroundColor: 'grey'}} />

            <MDBBtn onClick={handleSubmit} size='md'>
              Login
            </MDBBtn>
{/* 
            <hr className="my-4" />

            <MDBBtn className="mb-2 w-70" size="md" style={{backgroundColor: '#dd4b39', width:'70%', margin:'auto',fontSize:'80%'}}>
              <MDBIcon fab icon="google" className="mx-2"/>
              Sign in with google
           </MDBBtn>

            <MDBBtn className="mt-4 mb-4 w-70" size="md" style={{backgroundColor: '#3b5998', width:'70%', margin:'auto', fontSize:'80%'}}>
              <MDBIcon fab icon="facebook-f" className="mx-2"/>
              Sign in with facebook
            </MDBBtn> */}

          </MDBCardBody>
        </MDBCard>

      </MDBCol>
    </MDBRow>

  </MDBContainer>
           
           )
}

export default Login