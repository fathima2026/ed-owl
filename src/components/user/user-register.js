import React from 'react'
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2'
import { useParams, useNavigate } from 'react-router-dom';
import Lottie from "lottie-react"
import reganimation from "../user/animation/reganimation.json"
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,MDBCheckbox

} from 'mdb-react-ui-kit';
const USER_REGEX = /^[a-z ,.'-]+$/i;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const baseUrl = 'http://127.0.0.1:8000/api/'

const Register = () => {

  const navigate = useNavigate();
  const {role} = useParams();

  const userRef = useRef();
  const errRef = useRef();

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
}, [])

useEffect(() => {
    setValidFirstName(USER_REGEX.test(firstname));
}, [firstname])

useEffect(() => {
    setValidLastName(USER_REGEX.test(lastname));
}, [lastname])

useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
}, [email])

useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
}, [pwd, matchPwd])

useEffect(() => {
    setErrMsg('');
}, [firstname,lastname, pwd, matchPwd])
  
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(firstname);
    const v2 = USER_REGEX.test(lastname);

    const v3 = EMAIL_REGEX.test(email);
    const v4 = PWD_REGEX.test(pwd);
    
    if (!v1 || !v2 || !v3 || !v4) {
        setErrMsg("Invalid Entry");
        return;
    }
    try {
       
      const studentFormData = new FormData();
   
      studentFormData.append("first_name", firstname)
      studentFormData.append("last_name", lastname)
      studentFormData.append("email", email)
      studentFormData.append("password", pwd)
    
      console.log(studentFormData);

      // const response = await axios.post(baseUrl,studentFormData)
      const response = await axios.post(baseUrl+role+'/',studentFormData)


        console.log(response?.data);
        console.log(response?.accessToken);
        console.log(JSON.stringify(response))
        setSuccess(true);
        
        if(response.statusText == "Created"){
        Swal.fire({
          title: 'Registered Successfully, please login to continue',
          icon: 'success',
          toast:true,
          timer:3000,
          timerProgressBar: true,
          showConfirmButton: true,
          confirmButtonText: 'continue',
         }).then((result)=>{

          if(result.isConfirmed){

            navigate('/role')

          }})
           }
        
        
        //clear state and controlled inputs
        //need value attrib on inputs for this
        setFirstName('');
        setLastName('');
        setEmail('');
        setPwd('');
        setMatchPwd('');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
            setErrMsg(err.response);
        } else {
            setErrMsg(err.response.data)
        }
        errRef.current.focus();
    }
}

  const studentLoginStatus = localStorage.getItem('studentLoginStatus')
 
  return (
    <MDBContainer fluid style={{width: '57%',height:'700px'}}>

    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
     <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
       <MDBCardBody>
         <MDBRow>
           <MDBCol md='10' lg='5' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
 
             <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
 
             <div className="d-flex flex-row align-items-center mb-4 ">
               <MDBIcon fas icon="user me-3" size='lg'/>
               
               <MDBInput  label='first name' name='first_name' ref={userRef} id='first_name' type='text' 
               className='w-100' autoComplete="off"  onChange={(e) => setFirstName(e.target.value)}
               value={firstname} required aria-invalid={validFirstName ? "false" : "true"} aria-describedby="uidnote" 
               onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} />
 
               <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
               <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstname ? "hide" : "invalid"} />
             
             </div>
 
             <p id="uidnote" className={userFocus && firstname && !validFirstName ? "instructions" : "offscreen"}>
                             <FontAwesomeIcon icon={faInfoCircle} />
                             4 to 24 characters.<br />
                             Must begin with a letter.<br />
                             </p>
             
             
             <div className="d-flex flex-row align-items-center mb-4 ">
               
             <MDBIcon fas icon="user me-3" size='lg'/>
               
               <MDBInput  label='Last name' name='last_name' ref={userRef} id='last_name' type='text' 
               className='w-100' autoComplete="off"  onChange={(e) => setLastName(e.target.value)}
               value={lastname} required aria-invalid={validLastName ? "false" : "true"} aria-describedby="uidnote" 
               onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} />
 
               <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
               <FontAwesomeIcon icon={faTimes} className={validLastName || !lastname ? "hide" : "invalid"} />
             
             </div>
 
             <p id="uidnote" className={userFocus && lastname && !validLastName ? "instructions" : "offscreen"}>
                             <FontAwesomeIcon icon={faInfoCircle} />
                             4 to 24 characters.<br />
                             Must begin with a letter.<br />
                             </p>
             
             <div className="d-flex flex-row align-items-center mb-4 ">
               
             <MDBIcon fas icon="envelope me-3" size='lg'/>
                 
               <MDBInput  label='Email' name='email' ref={userRef} id='email' type='email' 
                 
                 className='w-100' autoComplete="off"  onChange={(e) => setEmail(e.target.value)}
                 value={email} required aria-invalid={validEmail ? "false" : "true"} aria-describedby="uidnote" 
                 onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} />
   
                 <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                 <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
               
             </div>
   
             <p id="uidnote" className={userFocus && email && !validEmail ? "instructions" : "offscreen"}>
             <FontAwesomeIcon icon={faInfoCircle} />
             invalid email<br />please put a valid email<br /></p>
 
             <div className="d-flex flex-row align-items-center mb-4">
               <MDBIcon fas icon="lock me-3" size='lg'/>
               <MDBInput  label='Password' name='password' type="password"
                             id="password"
                             onChange={(e) => setPwd(e.target.value)}
                             value={pwd}
                             required
                             aria-invalid={validPwd ? "false" : "true"}
                             aria-describedby="pwdnote"
                             onFocus={() => setPwdFocus(true)}
                             onBlur={() => setPwdFocus(false)}/>
              <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                             <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                         
             </div>
             <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                             <FontAwesomeIcon icon={faInfoCircle} />
                             8 to 24 characters.<br />
                             Must include uppercase and lowercase letters, a number and a special character.<br />
                             Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                         </p>
 
             <div className="d-flex flex-row align-items-center mb-4">
               <MDBIcon fas icon="key me-3" size='lg'/>
               <MDBInput label='Repeat your password' name='re_password' type='password'
                             id="confirm_pwd"
                             onChange={(e) => setMatchPwd(e.target.value)}
                             value={matchPwd}
                             required
                             aria-invalid={validMatch ? "false" : "true"}
                             aria-describedby="confirmnote"
                             onFocus={() => setMatchFocus(true)}
                             onBlur={() => setMatchFocus(false)}/>
              <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                             <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
             </div> 
             <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                             <FontAwesomeIcon icon={faInfoCircle} />
                             Must match the first password input field.
                         </p>

                     
             <MDBBtn onClick={handleSubmit} disabled={!validEmail || !validFirstName || !validLastName || !validPwd || !validMatch ? true : false} className='mb-4' size='lg'>Register</MDBBtn>
 
           </MDBCol>
 
           <MDBCol  lg='7' className='order-1 order-lg-2 d-flex align-items-center'>
           <Lottie animationData={reganimation}></Lottie>
           </MDBCol>
 
         </MDBRow>
       </MDBCardBody>
     </MDBCard>
 
   </MDBContainer>
  )
}

export default Register