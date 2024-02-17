import React from 'react'
import { Leaderboard } from 'flywheel-leaderboard'
import "./LeaderBoard.css"
import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react'
import axios from 'axios';
import Sidebar from '../../Sidebar';
const baseUrl = 'http://127.0.0.1:8000/api'

// const data = [
  
// ]
const LeaderBoard = () => {

  const {assignment_id} = useParams();

  const [data, setData] = useState({});

  useEffect(() =>{ 
          
    try{
     axios.get(baseUrl+'/hangman-rank/'+1).then((response)=>{

      setData( 
          
           response.data
          
      ); 
      console.log(data.data)
     });}
     catch(error){
      console.log(error)
     } },[])

  return (
    <div className="row">
    <aside className='col-2'>
    <Sidebar/>
    </aside>
    <div className='col-5 leaderboard-container'>
    <p style={{fontSize:'80px'}}><img style={{width:'80px'}}src='/Image/badge.png'></img>LEADERBOARD<img style={{width:'80px'}}src='/Image/badge.png'></img></p>

  {data && data.data ? (
        <Leaderboard className='rank-table'
          scoringMetric="points"
          id=""
          cell1="first_name"
          cell2="last_name"
          cell3="email"
          cell4="points"
          items={data.data}
        >
        </Leaderboard>
      ) : (
        <p>Loading...</p>
      )}
 </div> 
    </div>
   
  
  )
}

export default LeaderBoard