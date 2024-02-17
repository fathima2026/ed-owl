import React, { useEffect , useState} from 'react';
import { checkWin } from '../helpers/helpers';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api'

const Popup = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain,count,length}) => {
  const{hangman_id} = useParams()
  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const student_id = localStorage.getItem('id')

  const isWin = checkWin(correctLetters, wrongLetters, selectedWord) === 'win';

  if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
    finalMessage = 'Congratulations! You won! 😃';
    playable = false;
  } else if( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose' ) {
    finalMessage = 'Unfortunately you lost. 😕';
    finalMessageRevealWord = `...the word was: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => {
    setPlayable(playable);
  });


  useEffect(() => {
    if (finalMessage === 'Congratulations! You won! 😃') {
      setScore(score + 1);
    }
  }, [isWin]);

  useEffect(() => {
    console.log("Updated score is " + score);
  }, [score]);

  const submitScore = (score) =>{

    try{
      axios.get(baseUrl+'/fetch-hangman-status/'+student_id+'/'+hangman_id).then((response)=>{
      
        if(response.data.bool){
          console.log(response.data.bool);
          console.log(score);
          alert("You have already submitted this game");
          navigate("/student/courses");
        }
        else
        {

          
                  const hangmanFormData = new FormData();

                  hangmanFormData.append("hangman",hangman_id)
                  hangmanFormData.append("student",localStorage.getItem("id"))
  
                  hangmanFormData.append("marks",parseFloat(score))
    

    try{
      axios.post(baseUrl+'/'+'submit-hangman'+'/',hangmanFormData).then((response)=>{
        
        console.log(response.data)
  
    
          Swal.fire({
            
            title: 'Hangman submitted successfully',
            icon: 'success',
            toast:true,
            timer:3000,
            timerProgressBar: true,
            showConfirmButton: false
    
           })        ;   
           navigate("/student/courses");
          });
      }catch(err) {
  
        console.log(err);
      }; 
        setScore(0);
    
      }})}catch(error){
        console.log(error)
  }}
  

  return (
    <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
  
        {count===length-1 ? <button onClick={()=>submitScore(score-1)}>Submit!<h3>your score is :{score-1}</h3></button> : <button onClick={playAgain}>Next Question</button>}
      </div>
    </div>
  )
}

export default Popup
