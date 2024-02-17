import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Link, Navigate, useParams, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

const baseUrl = 'http://127.0.0.1:8000/api'
let quizData = [    {
  question: 'What is the capital of France?',
  options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
  correctAnswer: 'Paris',
},
{
  question: 'Which programming language is this app built with?',
  options: ['Java', 'Python', 'JavaScript', 'C++'],
  correctAnswer: 'JavaScript',
},]

  // Add more questions as needed


const QuizContainer = styled.div`
  max-width: 600px;
  margin: 55px auto;
  padding: 20px;
  background-color: #fff; /* White theme */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color:black; /* Text color */
  
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  button {
    &:hover {
      background: #222;
      color: #fff;
    }
`;

const Option = styled.li`
  margin-bottom: 10px;
`;

const Timer = styled.div`
  margin-bottom: 20px;
`;

const ScoreBar = styled.div`
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
`;

const ScoreFill = styled.div`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background-color: #333; /* Progress bar color */
`;

const Button = styled.button`
background: #fff;
color: #222;
font-weight: 500;
width : 100%;
border: 1px solid #222;
padding: 10px;
margin: 10px 0;
text-align: left;
border-radius: 4px;
cursor: pointer;
`;

const ViewQuiz = () => {
  const navigate = useNavigate();
  const {quiz_id} = useParams()
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds for the quiz
  const [score, setScore] = useState(0);
  const student_id = localStorage.getItem('id')
 

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        setShowResults(true);

      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(()=>{


  try{
      axios.get(baseUrl+'/quiz/'+quiz_id).then((response)=>{
 
       console.log(response.data.quiz); 
       quizData = response.data.quiz
       setTimeLeft(response.data.duration)
      //  console.log(typeof(question.quiz))
       
 
      });}
      catch(error){
       console.log(error)
      }


  },[])

  const submitScore = (score2) => {

    try{
      axios.get(baseUrl+'/fetch-quiz-status/'+student_id+'/'+quiz_id).then((response)=>{
      
        if(response.data.bool){
          console.log(response.data.bool);
          console.log(score2);
          alert("You have already submitted this quiz");
          navigate("/student/courses");
        }
        else
        {

          
    const quizFormData = new FormData();

    quizFormData.append("quiz",quiz_id)
    quizFormData.append("student",localStorage.getItem("id"))
  
    quizFormData.append("marks",parseFloat(score2))
    

    try{
      axios.post(baseUrl+'/'+'submit-quiz'+'/',quizFormData,{
        headers:{
          'content-type':'multipart/form-data'
        }
      }).then((response)=>{
        
        console.log(response.data)
  
    
          Swal.fire({
            
            title: 'Quiz submitted successfully',
            icon: 'success',
            toast:true,
            timer:3000,
            timerProgressBar: true,
            showConfirmButton: false
    
           })
    
  
      });
      }catch(err) {
  
        console.log(err);
      
      }; 

        
   resetQuiz();


  }})}catch(error){
        console.log(error)
  }}

  const handleAnswerSelect = (selectedOption) => {
    const isCorrect = selectedOption === quizData[currentQuestion].correctAnswer;
    setUserAnswers([...userAnswers, { question: currentQuestion, answer: selectedOption, isCorrect }]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
    setTimeLeft(60);
    setScore(0);
  };

  const calculateScorePercentage = () => {
    return (score / quizData.length) * 100;
  };

  return (
    <div style = {{height: '800px'}}>
    <QuizContainer>
      {showResults ? (
        <div>
          <h2>Quiz Results</h2>
          <ul>
            {userAnswers.map((answer, index) => (
              <li key={index}>
                Question {answer.question + 1}: {quizData[answer.question].question} - Your answer: {answer.answer} (
                {answer.isCorrect ? 'Correct' : 'Incorrect'})
              </li>
            ))}
          </ul>
          <p>Your Score: {score}</p>
           <Button onClick={()=>submitScore(score)}>Go home</Button>
        </div>
      ) : (
        <div>
          <h1 style={{fontSize:'25px',color:'#001e4d',fontWeight:'600',borderBottom:'1px solid #333',paddingBottom:'30px'}}>Quiz</h1>
          <QuestionContainer>
            <h2>{quizData[currentQuestion].question}</h2>
          </QuestionContainer>
          <OptionsList>
            {quizData[currentQuestion].options.map((option, index) => (
              <Option key={index}>
                <Button onClick={() => handleAnswerSelect(option)}>{option}</Button>
              </Option>
            ))}
          </OptionsList>
          <Timer>
            Time Left: {timeLeft} seconds
          </Timer>
          <ScoreBar>
            <ScoreFill percentage={calculateScorePercentage()} />
          </ScoreBar>
        </div>
      )}
    </QuizContainer></div>
    
  );
};

export default ViewQuiz;
