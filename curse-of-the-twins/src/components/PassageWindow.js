import React, { useState, useEffect, useRef } from 'react';
import './passageWindow.css';
import illustration1 from '../images/girl-sleeping.jpg';
import illustration2 from '../images/girl-awaken.jpg';
import illustration3 from '../images/parchment-intro.jpg';
import { animateScroll as scroll } from 'react-scroll';

const illustrations = [
  illustration1,
  illustration2,
];

const formatTextWithLineBreaks = (text) => {
  const formattedText = text.replace(/<br>/g, '<br />');
  return formattedText;
};


const PassageWindow = ({ passageId2 }) => {
  const [textPassages, setTextPassages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPassage = textPassages[currentIndex];
  const [displayText, setDisplayText] = useState('');
  const textRef = useRef(null);
  const textIndexRef = useRef(0);  // Référence pour le textIndex
  const [isTextComplete, setIsTextComplete] = useState(false);


  useEffect(() => {
    const timer = setInterval(() => {
      if (currentPassage && textIndexRef.current <= currentPassage.passage_text.length-1) {
        setDisplayText(prevDisplayText => {
          const charToAdd = currentPassage.passage_text[textIndexRef.current-1];
          return formatTextWithLineBreaks(prevDisplayText + charToAdd);
      });      
        textIndexRef.current++;
      } else {
        setIsTextComplete(true);
        clearInterval(timer);
      }
    }, 50);  // Vitesse d'affichage du texte.

    return () => {
      textIndexRef.current = 0;  // Réinitialisation de l'index de texte lors du nettoyage
      clearInterval(timer);
    };
  }, [currentPassage]);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [displayText]);

  useEffect(() => {
    const fetchPassages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/passages`);
        const allData = await response.json();
        // console.log(allData)
        const filteredData = allData.filter(passage => passage.id >= 6 && passage.id <= 13);
        // console.log(filteredData);
        filteredData.sort((a,b)=> a.id - b.id)
        setTextPassages(filteredData);
      } catch (error) {
        console.error('Error fetching text passages:', error);
      }
    };
    fetchPassages();
  }, []);

  const handleNext = () => {
    setDisplayText('');
    setIsTextComplete(false);
    if (currentIndex < textPassages.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      // Gérez ce qui se passe à la fin des passages (aller à un autre écran, etc.)
    }
  };

  return (
    <div className="passage-window">
      <div className="illustration-container2" style={{ backgroundImage: `url(${illustration2})` }}></div>
      <div className="text-container2">
        <div className="parchment2 aaa2" id="parchment-id" ref={textRef}>
        <p className="text2" dangerouslySetInnerHTML={{ __html: displayText }}></p>
        {isTextComplete && <button onClick={handleNext} className="next-button2">Next</button>}
        </div>
      </div>
    </div>
  );
}

export default PassageWindow;
