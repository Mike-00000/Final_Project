
import React, { useState, useEffect } from 'react';
import './choiceMenu.css'; 


const ChoiceMenu = ({ choices, onOptionSelected }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
  
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp') {
          setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (event.key === 'ArrowDown') {
          setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, choices.length - 1));
        } else if (event.key === 'Enter') {
          handleChoiceSelection();
        }
      };
  
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [selectedIndex, choices]);
  
    const handleChoiceSelection = () => {
      const selectedChoice = choices[selectedIndex];
      
      onOptionSelected(selectedChoice);
    };
  
    return (
      <div className="choice-menu">
        {choices.map((choice, index) => (
          <button
            key={choice.choice_id}
            className={`choice-button ${index === selectedIndex ? 'selected' : ''}`}
            onClick={handleChoiceSelection}
          >
            {choice.text}
          </button>
        ))}
      </div>
    );
  };
  
  export default ChoiceMenu;
  