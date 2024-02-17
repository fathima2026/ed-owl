import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api/hangman/'
// Styled components
const HangmanContainer = styled.div`
  background-color: #fff;
  color: #000;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
`;

const Title = styled.h2`
  color: #000;
`;

const Form = styled.form`
  margin-top: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #000;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const Subtitle = styled.h3`
  margin-top: 20px;
`;

const WordList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const WordItem = styled.li`
  margin-bottom: 10px;
`;

// HangmanForm component
const HangmanForm = () => {
 
  const [words, setWords] = useState([]);
  const [hints, setHints] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [currentHint, setCurrentHint] = useState('');
  
  const {module_id} = useParams();

  console.log(words)
  console.log(hints)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure both word and hint are provided
    if (currentWord && currentHint) {
      setWords([...words, currentWord]);
      setHints([...hints, currentHint]);
      setCurrentWord('');
      setCurrentHint('');
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter both a word and a hint.',
        icon: 'error',
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };
  const handleDeleteWord = (index) => {
    const updatedWords = [...words];
    const updatedHints = [...hints];
    updatedWords.splice(index, 1);
    updatedHints.splice(index, 1);
    setWords(updatedWords);
    setHints(updatedHints);
  };
 
  const [hangmanQData, setHangmanQData] = useState({

    title: '',
    module: '',
    words: '',
    hints: '',
    total_mark:'',
    due_date:''

  });

  const handleChange=(event) => {
    console.log(event.target.name,event.target.value)
    setHangmanQData({
      ...hangmanQData,
      [event.target.name]:event.target.value
    })
    console.log(hangmanQData)

  }



  const generateHangmanQuiz= (event) => {

    const hangmanFormData = new FormData();
    
    hangmanFormData.append("title", hangmanQData.title)
    hangmanFormData.append("module", module_id)
    hangmanFormData.append("words", JSON.stringify(words));
    hangmanFormData.append("hints", JSON.stringify(hints));
    hangmanFormData.append("total_mark", words.length)
    hangmanFormData.append("due_date", hangmanQData.due_date)


    event.preventDefault()

    try{
      axios.post(baseUrl,hangmanFormData).then((response)=>{
        
        console.log(response.data)
        event.preventDefault()
  
    
          Swal.fire({
            
            title: 'Hangman quiz Created successfully',
            icon: 'success',
            toast:true,
            timer:3000,
            timerProgressBar: true,
            showConfirmButton: false
    
           })
        
      
  
          setHangmanQData({
  
     
            title: '',
            module: '',
            words: '',
            hints: '',
            total_mark:'',
            due_date:''
      
       
    
  
      });
      })

    }
    catch(err){
      event.preventDefault()

      console.log(err);
    }


  }

  return (
 
        <HangmanContainer>
        <Title>Hangman Quiz Setup</Title>
        <Form>
        <div>
            <Label htmlFor="title">Title:</Label>
            <Input
            type="text"
            id="title"
            value={hangmanQData.title} name="title"
            onChange={handleChange}
          />
        </div>
        <div>
            <Label htmlFor="date">Due Date:</Label>
            <Input
            type="date"
            id="date"
            value={hangmanQData.due_date} name="due_date"
            onChange={handleChange}
          />
        </div>
        </Form>
        <hr />
        <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="word">Word:</Label>
          <Input
            type="text"
            id="word"
            value={currentWord}
            onChange={(e) => setCurrentWord(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="hint">Hint:</Label>
          <Input
            type="text"
            id="hint"
            value={currentHint}
            onChange={(e) => setCurrentHint(e.target.value)}
          />
        </div>
        <Button type="submit">Add Word</Button>
      </Form>

      <div>
        <Subtitle>Word List:</Subtitle>
        <WordList>
          {words.map((word, index) => (
            <WordItem key={index}>
              <strong>{word}</strong> - {hints[index]}
              <Button onClick={() => handleDeleteWord(index)}>Delete</Button>

            </WordItem>
          ))}
        </WordList>
      </div>

      <Button onClick={generateHangmanQuiz}>Generate the Quiz</Button>

    </HangmanContainer>
  );
};

export default HangmanForm;
