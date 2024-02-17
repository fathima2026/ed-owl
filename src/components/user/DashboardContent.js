import React from 'react'
import { useEffect } from 'react'
import useAuth from '../../hooks/useAuth';
const DashboardContent = () => {


  const studentLoginStatus = localStorage.getItem('studentLoginStatus')
  if(!studentLoginStatus){
   window.location.href = '/login'
  }


  useEffect(()=> {
    document.title = 'Dashboard'
  })
  
  return (
    <div>dashboard-content</div>
  )
}

export default DashboardContent