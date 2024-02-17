import React from 'react'
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
const StudentLogout = () => {
  
    const navigate = useNavigate()
 
    
    useEffect(()=>{


        localStorage.removeItem('studentLoginStatus')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('first_name')


        window.location.href='/role'

    },[])
    
   
}

export default StudentLogout