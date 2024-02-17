import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';
import axios from 'axios';
import './Hangman.css';
import { useParams } from 'react-router-dom';
const baseUrl = 'http://127.0.0.1:8000/api'

let words = ['application', 'bangladesh', 'interface', 'wizard'];
let hints = ['it is a software','it is a country name','it is what you see', 'harry potter']


function Hangman() {

  const{hangman_id}= useParams();
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedWord, setSelectedWord] = useState('');
  const [selectedHint, setSelectedHint] = useState('');

 
  
  useEffect(()=>{
    try{
        axios.get(baseUrl+'/hangman/'+hangman_id).then((response)=>{
   
        
         console.log(response.data.words); 
         console.log(response.data.hints); 
         console.log(response.data.hints)
         
         words = response.data.words
         hints = response.data.hints

         setSelectedWord(words[count]);
         setSelectedHint(hints[count]);
   
        });}
        catch(error){
         console.log(error)
        }
  
  
    },[])

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    setCount(count + 1);
    setSelectedWord(words[count + 1]);
    setSelectedHint(hints[count + 1]);
  }

  return (
    <div className='hangman-root'>
      <Header />
      <h3>{selectedHint}</h3>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup length={words.length} count={count} correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </div>
  );
}

export default Hangman;
