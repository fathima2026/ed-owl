import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff; /* White theme */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AddAnswerButton = styled.button`
  background-color: #333; /* Button color */
  color: #fff; /* Text color */
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const RemoveAnswerButton = styled.button`
  background-color: #ff6347; /* Button color */
  color: #fff; /* Text color */
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  background-color: #333; /* Button color */
  color: #fff; /* Text color */
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const QuestionForm = ({ onSave }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };


  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (value) => {
    setCorrectAnswer(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ question, options, correctAnswer });
    setQuestion('');
    setOptions(['', '']);
    setCorrectAnswer('');
  };

  return (
    <FormContainer>
    <form onSubmit={handleSubmit}>
      <FormLabel>Question:</FormLabel>
      <FormInput type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />

      <FormLabel>Options:</FormLabel>
      {options.map((option, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <FormInput
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
          <input
            type="radio"
            name="correctAnswer"
            checked={correctAnswer === option}
            onChange={() => handleCorrectAnswerChange(option)}
          />
          <span>Correct Answer</span>
          {index > 1 && (
            <RemoveAnswerButton type="button" onClick={() => handleRemoveOption(index)}>
              Remove Option
            </RemoveAnswerButton>
          )}
        </div>
      ))}

      <AddAnswerButton type="button" onClick={handleAddOption}>
        Add Option
      </AddAnswerButton>

      <SaveButton type="submit">Save Question</SaveButton>
    </form>
  </FormContainer>
  );
};

export default QuestionForm;
