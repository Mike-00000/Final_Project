import React, { useState, useEffect, useContext } from 'react';
import './passageWindow.css';
import illustration1 from '../images/girl-sleeping.jpg';
import illustration2 from '../images/girl-awaken.jpg';
import { animateScroll as scroll } from 'react-scroll';
import { AppContext } from '../App';



const illustrations = [
  illustration1,
  illustration2,
];

const testPassages = [
  {
      id: 1,
      passage_text: "Exemple de texte à afficher."
  }
];

const PassageWindow = ({ passageId, onNextPassage }) => {
  console.log("Passage ID at render:", passageId);

  console.log("Current passageId:", passageId);
  const [displayText, setDisplayText] = useState('Texte initial');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIllustration, setCurrentIllustration] = useState(illustrations[0]);
  const [textPassages, settextPassages] = useState([]);
  const [showNextButton, setShowNextButton] = useState(true);
  const { handleNextComponent, passageIdfordb } = useContext(AppContext);

  const yourChoicesArray = [
    { choice_id: 1, text: 'Choice 1', nextPassageId: 2 },
    { choice_id: 2, text: 'Choice 2', nextPassageId: 3 },
  ];

  const formatTextWithLineBreaks = (text) => {
    return text.replace(/<br>/g, '<br />');
  };

  const textRef = React.useRef(null);

  const handleNextStep = () => {
    if (currentIndex < textPassages[passageId].steps.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      console.log("Current value of passageId after clicking the button:", passageId);
    } else {
      onNextPassage(yourChoicesArray[passageIdfordb - 1].nextPassageId);
    }
  };

  useEffect(() => {
    const fetchPassages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/passages/${passageIdfordb}`);
        const data = await response.json();
        console.log("Data from server:", data);
        if (Array.isArray(data)) {
          settextPassages(data);
        } else {
          settextPassages([data]);
        }
      } catch (error) {
        console.error('Error fetching text passages:', error);
      } console.log("Data retrieved from server (textPassages):", textPassages);
    };

    fetchPassages();
  }, [passageIdfordb]);

  useEffect(() => {
    if (textPassages.length > 0) {
      const passageText = textPassages.find(passage => passage.passage_id === passageId)?.passage_text || '';
      console.log("Value of passageText based on current passageId:", passageText);
      setDisplayText(passageText);
    }
  }, [textPassages, passageId]);

  useEffect(() => {
    scroll.scrollToBottom();
  }, [currentIndex]);

  useEffect(() => {
    textRef.current.scrollTop = textRef.current.scrollHeight;
  }, [displayText]);

  // console.log("Display text:", displayText);


  // console.log("textPassages state:", textPassages);

  // console.log('Value of displayText:', displayText);


  return (
    <div className="container2">
      <div className="illustration-container2" style={{ backgroundImage: `url(${currentIllustration})` }} />
      <div className="text-container2">
        <div className="parchment2 aaa2" id="parchment-id2" ref={textRef}>
          
          <p className="text2">Test text</p>
          <p className="text">{testPassages[0].passage_text}</p>
          <p className="text2">{displayText}</p>
          <p className="text2"  dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(displayText)   }} />
          {showNextButton && <button onClick={handleNextStep} className="next-button2">Next</button>}
          <button onClick={() => setDisplayText('Texte modifié')}>Changer le texte</button>

        </div>
      </div>
      <audio src="/Secret of the Forest.mp3" autoPlay />
    </div>
  );
};

export default PassageWindow;
