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

const charactersPerFrameArray = [100];

const PassageWindow = ({ passageId,onNextPassage }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIllustration, setCurrentIllustration] = useState(illustrations[0]);
  const [introductionPassages, setIntroductionPassages] = useState([]);
  const [showNextButton, setShowNextButton] = useState(true);
  const { handleNextComponent, passageIdfordb } = useContext(AppContext);
  // const [passageId, setPassageId] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  const yourChoicesArray = [
    { choice_id: 1, text: 'Choice 1', nextPassageId: 2 },
    { choice_id: 2, text: 'Choice 2', nextPassageId: 3 },
  ];

  const formatTextWithLineBreaks = (text) => {
    const formattedText = text.replace(/<br>/g, '<br />');
    return formattedText;
  };

  const textRef = React.useRef(null);

  const handleNextStep = () => {
    if (currentIndex < introductionPassages[passageId - 1].steps.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      onNextPassage(yourChoicesArray[passageId - 1].nextPassageId);
    }
  };

  useEffect(() => {
    const fetchIntroductionPassages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/passages/${passageIdfordb}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          console.log("dddddd",data);
          setIntroductionPassages(data);
        }
      } catch (error) {
        console.error('Error fetching introduction passages:', error);
      }
    };

    fetchIntroductionPassages();
  }, []);

  useEffect(() => {
    const passageText = introductionPassages?.find((passage) => passage.id === passageId)?.passage_text || '';
    console.log('introductionPassages[passageId]',introductionPassages[passageId]);
    const intervalId = setInterval(() => {
      const charactersPerFrame = charactersPerFrameArray.find((value, index) => index === passageId - 1) || 100;
      console.log("passageText=>",passageText,passageId);
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
            onNextPassage(yourChoicesArray[passageId].nextPassageId);
          }, 6700);
        } else {
          setShowNextButton(true);
        }
      }
    }, 75);

    return () => clearInterval(intervalId);
  }, [passageId, currentIndex ]);

  useEffect(() => {
    scroll.scrollToBottom();
  }, [currentIndex]);

  useEffect(() => {
    textRef.current.scrollTop = textRef.current.scrollHeight;
  }, [displayText]);

  return (
    <div className="container">
      <div className="illustration-container2" style={{ backgroundImage: `url(${currentIllustration})` }} />
      <div className="text-container">
        <div className="parchment aaa" id="parchment-id" ref={textRef}>
          <p className="text" dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(displayText) }} />
          {showNextButton && <button onClick={handleNextStep} className="next-button">Next</button>}
        </div>
      </div>
      <audio src="/Mars Village - Moderate.mp3" autoPlay={isMusicPlaying} />
    </div>
  );
};

export default PassageWindow;