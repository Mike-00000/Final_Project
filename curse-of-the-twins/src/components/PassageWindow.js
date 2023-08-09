import React, { useState, useEffect } from 'react';
import './passageWindow.css'; // Assurez-vous d'avoir le bon chemin vers votre fichier CSS
import { animateScroll as scroll } from 'react-scroll';

const PassageWindow = ({ passage, onNextPassage }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  // const [choices, setChoices] = useState([]);

  const formatTextWithLineBreaks = (text) => {
    const formattedText = text.replace(/<br>/g, '<br />');
    return formattedText;
  };

  const handleChoiceSelection = (choiceIndex) => {
    // const selectedChoice = choices[choiceIndex];
    // onNextPassage(selectedChoice.next_passage_id);
  };

  const handleNext = () => {
    console.log("Next button clicked"); // Ajoutez ce log pour vérifier si la fonction est appelée
    setDisplayText('');
    setCurrentIndex(0);
    setIsButtonVisible(false);
    // onNextPassage(passage.next_passage_id); // Passage suivant défini dans le choix précédent
    onNextPassage(); // Appeler la fonction pour passer au prochain passage

  };

  useEffect(() => {
    // setChoices(passage.choices);
  }, [passage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < passage.passage_text.length) {
        setDisplayText((prevText) => prevText + passage.passage_text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(intervalId);
        setIsButtonVisible(true);
      }
    }, 75);

    return () => clearInterval(intervalId);
  }, [currentIndex, passage.passage_text]);

  useEffect(() => {
    scroll.scrollToBottom();
  }, [displayText]);

  return (
    <div className="passage-container">
      <div className="passage-text">
        <p dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(displayText) }} />
      </div>
      {isButtonVisible && (
        <button className="next-button" onClick={handleNext}>Next</button>
      )}
      {/* {choices.length > 0 && (
        <div className="choices">
          {choices.map((choice, index) => (
            <button key={index} onClick={() => handleChoiceSelection(index)}>
              {choice.text}
            </button>
          ))}
        </div>
      )} */}
      
    </div>
  );
};

export default PassageWindow;
