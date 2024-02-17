import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Sidebar.css"
const Sidebar = () => {
  return (
    <div class="sidenav">
  <NavLink exact to="/teacher/courses" style={{marginTop:'20px'}}><i class="fa-solid fa-graduation-cap" style={{marginRight:'47px'}}></i>Dashboard</NavLink>
  <hr className='hr-tag'/>
  <NavLink exact to="/teacher/courses"><i class="fa-solid fa-book-open"style={{marginRight:'48px'}}></i>Courses</NavLink>
  <hr className='hr-tag'/>
  <NavLink exact to="teacher/add-course"><i class="fa-regular fa-address-card"style={{marginRight:'48px'}}></i>Add Course</NavLink>
  <hr className='hr-tag'/>
  <NavLink exact to="/teacher/courses"><i class="fa-solid fa-envelope"style={{marginRight:'50px'}}></i>Messages</NavLink>
  <hr className='hr-tag'/>
  <NavLink exact to="/teacher/courses"><i class="fa-regular fa-address-card"style={{marginRight:'48px'}}></i>Profile</NavLink>
  <hr className='hr-tag'/>

  
</div>
  );
};

export default Sidebar;