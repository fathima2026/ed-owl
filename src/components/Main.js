import React from 'react'
// import {MyCourses,AddCourse,AddTopic,Topics,EditTopic,TopicDetail,EditCourse} from './user/Teacher'
import Navigation from './header/Navigation'
import Home from './body/Home'
import FooterComponent from './footer/FooterComponent'
import{Routes, Route} from 'react-router-dom'
import Login from './user/user-login'
import Register from './user/user-register'
import Dashboard from './user/user-dashboard'
import StudentLogout from './user/StudentLogout'
import MyCourses from './user/Teacher/MyCourses'
import AddCourse from './user/Teacher/AddCourse'
import AddTopic from './user/Teacher/AddTopic'
import Topics from './user/Teacher/CourseTopic'
import EditTopic from './user/Teacher/EditTopic'
import TopicDetail from './user/Teacher/TopicDetail'
import EditCourse from './user/Teacher/EditModule'
import LayoutComponent from './LayoutComponent'
import RequireAuth from './user/RequireAuth'
import LoginChoice from './user/LoginChoice'
import Unauthorized from './user/Unauthorized'
import StudentDashboard from './user/Student/StudentDashboard'
import AllGames from './user/Public_Games/AllGames'
import RegisterChoice from './user/RegisterChoice'
import StudentCourses from './user/Student/StudentCourses'
import CourseTopicStudent from './user/Student/CourseTopicStudent'
import AddAssignment from './user/Teacher/AddAssignment'
import EditAssignment from './user/Teacher/EditAssignment'
import StudentAssignment from './user/Student/StudentAssignment'
import ViewAssignment from './user/Teacher/ViewAssignment'
import ViewQuiz from './user/Student/ViewQuiz'
import SetMcq from './user/Teacher/SetMcq'
import Hangman from './user/Student/Games/Hangman/Hangman'
import StudentHangman from './user/Student/StudentHangman'
import HangmanForm from './user/Teacher/HangmanForm'
import HangmanDashboard from './user/Teacher/HangmanDashboard'
import Users from './user/Users'
import Admin from './user/Admin'
import ViewQuizTeacher from './user/Teacher/ViewQuiz'
import PersistLogin from './user/PersistLogin'
import LeaderBoard from './user/Student/LeaderBoard/LeaderBoard'
const Main = () => {
  return (

    <div className="App">
        <Navigation/>
        <Routes>
        
        <Route path = "/" element={<LayoutComponent/>}>
       
        {/* public routes */}
        <Route path ="" element = {<Home/>}/>
        
        <Route path = "login/:role" element={<Login/>}/>

        <Route path = "register/:role" element={<Register/>}/>

        
        <Route path = "role" element={<LoginChoice/>}/>
        
        <Route path = "regrole" element={<RegisterChoice/>}/>


        <Route path='unauthorized' element={<Unauthorized/>}></Route>

        <Route path = "/student-logout" element={<StudentLogout/>}/>

        <Route path = "games" element={<AllGames/>}/>

        {/* <Route element = {<RequireAuth allowedRoles={["teacher","user","student"]}/>} >

        <Route path = "games" element={<AllGames/>}/>



        </Route> */}

        {/* Protect routes */}
        <Route element={<PersistLogin/>} >

        <Route element = {<RequireAuth allowedRoles={["staff"]}/>} >

        
        <Route path = "/user" element={<Users/>}/>
        <Route path = "/admin" element={<Admin/>}/>



        </Route>


        <Route element = {<RequireAuth allowedRoles={["teacher"]}/>} >

        
        <Route path = "teacher/edit-module/:module_id" element={<EditCourse/>}/>
        <Route path = "/teacher/dashboard" element={<Dashboard/>}/>
        <Route path = "/teacher/courses" element={<MyCourses/>}/>
        <Route path = "/teacher/courses/teacher/add-course" element={<AddCourse/>}/>
        <Route path = "/teacher/add-topic/:module_id" element={<AddTopic/>}/>
        <Route path = "/teacher/add-assignment/:module_id" element={<AddAssignment/>}/>
        <Route path = "/teacher/edit-assignment/:assignment_id" element={<EditAssignment/>}/>
        <Route path = "/teacher/assignment/:assignment_id" element={<ViewAssignment/>}/>
        <Route path = "/teacher/topic/:module_id" element={<Topics/>}/>
        <Route path = "/teacher/edit-topic/:topic_id" element={<EditTopic/>}/>
        <Route path = "/teacher/view-topic/:topic_id" element={<TopicDetail/>}/>
        <Route path = "/teacher/edit-module/:module_id" element={<EditCourse/>}/>
        <Route path = "/teacher/setquiz/:module_id" element={<SetMcq/>}/>
        <Route path = "/teacher/quiz/:quiz_id" element={<ViewQuizTeacher/>}/>
        <Route path = "/teacher/sethangman/:module_id" element={<HangmanForm/>}/>
        <Route path = "/teacher/hangman/:hangman_id" element={<HangmanDashboard/>}/>



        </Route>
        {/* catch all */}
        <Route element={<RequireAuth allowedRoles={["student"]} />}>
         
          <Route path = "/student/courses" element={<StudentCourses/>}/>
          <Route path = "/student/topic/:module_id" element={<CourseTopicStudent/>}/>
          <Route path = "/student/assignment/:assignment_id" element={<StudentAssignment/>}/>
          <Route path="student-dashboard" element={<StudentDashboard />} />
          <Route path='/student/quiz/:quiz_id' element={<ViewQuiz/>}></Route>
          <Route path='/student/hangman/:hangman_id' element={<StudentHangman/>}></Route>
          <Route path='/student/play-hangman/:hangman_id' element={<Hangman/>}></Route>
          <Route path='/student/leaderboard' element={<LeaderBoard/>}></Route>

        </Route>
        
        
        </Route>
        </Route> 


   
        </Routes>
        <FooterComponent/>
    </div>
  )
   
    
}

export default Main