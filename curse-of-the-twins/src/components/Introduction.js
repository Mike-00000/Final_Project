import React, { useState, useEffect, useContext } from 'react';
import './introduction.css';
import illustration1 from '../images/parchment-intro.jpg';
import illustration2 from '../images/forest-cabin.jpg';
import illustration3 from '../images/loan_shark-and-father.jpg';
import illustration4 from '../images/bandits-attack-father.jpg';
import illustration5 from '../images/hidden-girl.jpg';
import illustration6 from '../images/girl-escape.jpg';
import { animateScroll as scroll } from 'react-scroll';
// import { handleNextComponent } from '../App';
import { AppContext } from '../App';

const backgroundIllustration = illustration1;

const illustrations = [
  illustration2,
  illustration3,
  illustration4,
  illustration5,
  illustration6,
];

const charactersPerFrameArray = [50, 30, 20]; 

const Introduction = (props) => {
  console.log("Introduction props", props);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIllustration, setCurrentIllustration] = useState(illustrations[0]);
  const [introductionPassages, setIntroductionPassages] = useState([]);
  const [passageId, setPassageId] = useState(1);
  const [showNextButton, setShowNextButton] = useState(true);

  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const { handleNextComponent, passageIdfordb } = useContext(AppContext);
  const formatTextWithLineBreaks = (text) => {
    const formattedText = text.replace(/<br>/g, '<br />');
    return formattedText;
  };

  const textRef = React.useRef(null);

  useEffect(() => {
    const fetchIntroductionPassages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/passages/${passageIdfordb}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setIntroductionPassages(data);
        }
      } catch (error) {
        console.error('Error fetching introduction passages:', error);
      }
    };

    fetchIntroductionPassages();
  }, [passageId]);

  useEffect(() => {
    const passageText = introductionPassages?.find((passage) => passage.id === passageId)?.passage_text || '';

    const intervalId = setInterval(() => {
      const charactersPerFrame = charactersPerFrameArray.find((value, index) => index === passageId - 1) || 100;
      if (currentIndex < passageText.length) {
        setDisplayText((prevText) => prevText + passageText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(intervalId);
        if (currentIllustration !== illustrations[illustrations.length - 1]) {
          setTimeout(() => {
            const currentIllustrationIndex = illustrations.indexOf(currentIllustration);
            setCurrentIllustration(illustrations[currentIllustrationIndex + 1]);
            setCurrentIndex(0);
            setDisplayText('');
            setPassageId((prevPassageId) => prevPassageId + 1);
          }, 6700);
        } else {
          setShowNextButton(true); // Afficher le bouton "Next" après la fin de l'introduction
        }
      }
    }, 75);

    return () => clearInterval(intervalId);
  }, [currentIndex, currentIllustration, introductionPassages, passageId]);

  useEffect(()=> {
    textRef.current.scrollTop = textRef.current.scrollHeight
  },[displayText])

  return (
    <div className="container">
      <div className="illustration-container" style={{ backgroundImage: `url(${currentIllustration})` }} />
      <div className="text-container">
        <div className="parchment aaa" id="parchment-id" ref={textRef}>
          <p className="text"  dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(displayText)   }} />
        {showNextButton && <button onClick= {handleNextComponent} className="next-button">Next</button>}
        </div>
      </div>
      <audio src="/RPG intro 100 BPM2.wav" autoPlay={isMusicPlaying} />
    </div>
  );
};

export default Introduction;
