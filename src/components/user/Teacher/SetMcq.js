import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api/quiz/'

function SetMcq() {

  const {module_id} = useParams();
  const [quizData, setQuizData] = useState([]);
  const navigate = useNavigate();
  const [submitQuizData, setsubmitQuizData] = useState({

    title: '',
    quiz: '',
    module: '',
    total_mark: '',
    due_date:'',
    duration:''

  });

  const handleSaveQuestion = (newQuestion) => {
    setQuizData([...quizData, newQuestion]);
  };

  const handleChange=(event) => {
    console.log(event.target.name,event.target.value)
    setsubmitQuizData({
      ...submitQuizData,
      [event.target.name]:event.target.value
    })
    console.log(submitQuizData)

  }



  const generateQuiz= (event) => {

    const quizFormData = new FormData();
    
    const dateformat = submitQuizData.due_date.split("-").reverse().join("/")

    quizFormData.append("title", submitQuizData.title)
    quizFormData.append("quiz", JSON.stringify(quizData));
    console.log(submitQuizData.quiz)
    quizFormData.append("module", module_id)
    quizFormData.append("total_mark", submitQuizData.total_mark)
    quizFormData.append("due_date", submitQuizData.due_date)
    quizFormData.append("duration", submitQuizData.duration)


    event.preventDefault()

    try{
      axios.post(baseUrl,quizFormData,{
        headers:{
          'content-type':'multipart/form-data'
        }
      }).then((response)=>{
        
        console.log(response.data)
        event.preventDefault()
  
    
          Swal.fire({
            
            title: 'Quiz Created successfully',
            icon: 'success',
            toast:true,
            timer:3000,
            timerProgressBar: true,
            showConfirmButton: false,
    
           })
        
          navigate(`/teacher/courses`)
  
          setsubmitQuizData({
  
          title: '',
          quiz: '',
          module: '',
          total_mark: '',
          due_date:'',
          duration:''
      
       
    
  
      });
      })

    }
    catch(err){
      event.preventDefault()

      console.log(err);
    }


  }

  console.log(quizData);


  return (
    <Row style={{height:'auto'}} >
        <Col>
        
        <Row>
      
        <Form className="py-4"  style={{width:'50%', margin:'auto'}}>
        <Form.Group className="mb-3">
        <Form.Label>Quiz Title</Form.Label>
        <Form.Control onChange={handleChange} value={submitQuizData.title} type="text" placeholder="Enter Assignment Title" name="title" required/>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Total mark</Form.Label>
        <Form.Control onChange={handleChange} value={submitQuizData.total_mark} type="number" placeholder="Total Mark" name="total_mark"/>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Duration</Form.Label>
        <Form.Control onChange={handleChange} value={submitQuizData.duration} type="number" placeholder="duration" name="duration"/>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control onChange={handleChange} value={submitQuizData.due_date} type="date" placeholder="date" name="due_date"/>
        </Form.Group>
       
       </Form>

        </Row>


        <Row>
   
        <QuestionForm onSave={handleSaveQuestion} />

        </Row>
        
        
        
        </Col>
        <Col style={{backgroundColor:'#fff', margin:'20px 30px',borderRadius:'15px',height:'auto'}} >
        <div className="col" style={{ marginTop: '20px' }}>
        <h2>Questions:</h2>
        <ul>
          {quizData.map((question, index) => (
            <li key={index}>
              <h3>Q{index+1}-{question.question}</h3>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li style={{listStyle:'none'}}key={optionIndex}>
                    {option === question.correctAnswer ? (
                      <strong style={{backgroundColor:'yellow'}}>{optionIndex+1}. {option}</strong>
                    ) : (
                      <span>{optionIndex+1}. {option}</span>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={generateQuiz}>Generate the Quiz</Button>
        </Col>
       
      
      </Row>
  );
}

export default SetMcq;
