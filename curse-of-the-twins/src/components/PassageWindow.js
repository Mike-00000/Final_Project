import React, { useState, useEffect, useRef } from "react";
import "./passageWindow.css";
import illustration1 from "../images/girl-sleeping.jpg";
import illustration2 from "../images/girl-awaken.jpg";
import illustration3 from "../images/forest.jpg";
import illustration4 from "../images/girl-sees-boy.jpg";
import illustration5 from "../images/tavern.jpg";
import illustration6 from "../images/taverne2.jpg";
import illustration7 from "../images/village.jpg";
import illustration8 from "../images/girltree.jpg";
import illustration9 from "../images/girlatknees.jpg";

// import { animateScroll as scroll } from 'react-scroll';

// const illustrations = [illustration1, illustration2];

const illustrationsMap = {
  6: illustration1,
  7: illustration2,
  10: illustration3,
  15: illustration4,
  23: illustration5,
  41: illustration6,
  145: illustration7,
  31: illustration3,
  32: illustration8,
  71: illustration3,
  92: illustration9,
  108: illustration3,
  129: illustration9,
};

const musicMap = {
  6: "/Secret of the Forest.mp3",
  41: "You Can Hear The Cry Of The Planet.mp3",
  25: "Mars Village - Moderate.mp3",
  31: "Floating Museum (Darker Vision).mp3",
  55: "Awakening.mp3",
  145: "Floating Museum (Darker Vision).mp3",
};


const ENDING_PASSAGE_IDS = [107, 144, 165, 185]; 

const formatTextWithLineBreaks = (text) => {
  let formattedText = text.replace(/<br>/g, "<br />");
  // formattedText = text.replace(/#/g, '');
  return formattedText;
};

const determineChoicesToFetch = (currentPassageId) => {
  switch (currentPassageId) {
    case 16:
      return "1,2";
    case 24:
      return "3,4";
    case 30:
      return "5,6";
    case 37:
      return "7,8";
    case 47:
      return "9,10";
    case 70:
      return "11,12";
    default:
      return "";
  }
};

const PassageWindow = ({ passageId2 }) => {
  const audioRef = useRef(null);

  const [textPassages, setTextPassages] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPassage = textPassages[currentIndex];
  const [displayText, setDisplayText] = useState("");
  const textRef = useRef(null);
  const textIndexRef = useRef(0); // Référence pour le textIndex
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const currentMusic = musicMap[currentPassage?.id];

  const [currentIllustration, setCurrentIllustration] = useState(illustration1); // Image initiale par défaut.

  // const hashText = useRef(false)
  const [isAtEndOfPassages, setIsAtEndOfPassages] = useState(false);
  const [isChapterEnd, setIsChapterEnd] = useState(false);

  useEffect(() => {
    console.log("isAtEndOfPassages:", isAtEndOfPassages);
    console.log("currentPassage ID:", currentPassage?.id);
    console.log("isTextComplete:", isTextComplete);
}, [isAtEndOfPassages, currentPassage?.id, isTextComplete]);

useEffect(() => {
  if (isAtEndOfPassages && ENDING_PASSAGE_IDS.includes(currentPassage?.id)) {
      console.log("Passage de fin détecté avec ID:", currentPassage?.id);
  }
}, [isAtEndOfPassages, currentPassage?.id]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (
        currentPassage &&
        textIndexRef.current <= currentPassage.passage_text.length - 1
      ) {
        // hashText.current = false
        setDisplayText((prevDisplayText) => {
          const charToAdd =
            currentPassage.passage_text[textIndexRef.current - 1];
          // if(charToAdd === '#') {
          //   setIsTextComplete(true)
          //   clearInterval(timer);
          //   // hashText.current = true
          // }

          return formatTextWithLineBreaks(prevDisplayText + charToAdd);
        });

        textIndexRef.current++;
      } else {
        setIsTextComplete(true);
        // hashText.current = false
        // textIndexRef.current--;
        clearInterval(timer);
      }
    }, 75); // Vitesse d'affichage du texte.

    return () => {
      textIndexRef.current = 0; // Réinitialisation de l'index de texte lors du nettoyage
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
        const filteredData = allData.filter(
          (passage) => passage.id >= 6 && passage.id <= 16
        );
        // console.log(filteredData);
        filteredData.sort((a, b) => a.id - b.id);
        setTextPassages(filteredData);
      } catch (error) {
        console.error("Error fetching text passages:", error);
      }
    };
    fetchPassages();
  }, []);

  const handleNext = () => {
    if (ENDING_PASSAGE_IDS.includes(currentPassage?.id)) {
      setIsChapterEnd(true);
      setDisplayText("");
      return;
    }

    if (currentIndex === textPassages.length - 1) {
      setIsAtEndOfPassages(true);
      return;
    }

    setDisplayText("");
    // setIsTextComplete(true);
    // if(hashText.current) {
    //   // hashText.current = false
    //   // return
    // };
    setIsTextComplete(true);
    if (currentIndex < textPassages.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      // Gérez ce qui se passe à la fin des passages (aller à un autre écran, etc.)
    }
  };

  const [choices, setChoices] = useState([]);

  useEffect(() => {
    if (illustrationsMap[currentPassage?.id]) {
      setCurrentIllustration(illustrationsMap[currentPassage?.id]);
    }
  }, [currentPassage?.id]);
  

  useEffect(() => {
    if (isAtEndOfPassages) {
      const fetchChoices = async () => {
        console.log("End of passage:", currentPassage?.id);
        const choiceIdsToFetch = determineChoicesToFetch(currentPassage?.id);
        if (choiceIdsToFetch) {
          try {
            const response = await fetch(
              `http://localhost:3000/options/${choiceIdsToFetch}`
            );
            const data = await response.json();
            setChoices(data);
          } catch (error) {
            console.error("Error fetching choices:", error);
          }
        }
      };
      fetchChoices();
    }
  }, [isAtEndOfPassages, currentPassage?.id]);

  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(0); // Pour garder une trace de l'option actuellement sélectionnée

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isAtEndOfPassages) {
        if (event.key === "ArrowDown") {
          setSelectedChoiceIndex(
            (prevIndex) => (prevIndex + 1) % choices.length
          );
        } else if (event.key === "ArrowUp") {
          setSelectedChoiceIndex(
            (prevIndex) => (prevIndex - 1 + choices.length) % choices.length
          );
        } else if (event.key === "Enter") {
          const selectedChoice = choices[selectedChoiceIndex];
          const nextPassageId = selectedChoice.passage_id_next;
          console.log("Selected Choice Index:", selectedChoiceIndex);
          console.log("Next Passage ID:", nextPassageId);

          const loadNextPassages = async (passageId) => {
            try {
              const response = await fetch(
                `http://localhost:3000/passages/${passageId}`
              );
              const allData = await response.json();
              setTextPassages(allData);

              // Réinitialiser les variables d'état pour afficher le nouveau passage
              setCurrentIndex(0);
              setDisplayText("");
              setIsAtEndOfPassages(false);
            } catch (error) {
              console.error(
                "Error fetching passages for the next choice:",
                error
              );
            }
          };

          loadNextPassages(nextPassageId);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isAtEndOfPassages, choices, selectedChoiceIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // 50% de volume
    }
  }, []);

  return (
    <div className="passage-window">
      <div
        className="illustration-container2"
        style={{ backgroundImage: `url(${currentIllustration})` }}
      ></div>
      <div className="text-container2">
      <div className="parchment2 aaa2" id="parchment-id" ref={textRef}>
    {isChapterEnd ? (
      <div className="chapter-end chapter-end-lower">End of the first chapter</div>
    ) : (
        <>
            <p
                className={`text2 ${
                    currentPassage?.passage_type === "thought" ? "italic-text" : ""
                }`}
                dangerouslySetInnerHTML={{ __html: displayText }}
            ></p>
            {isAtEndOfPassages && !ENDING_PASSAGE_IDS.includes(currentPassage?.id) ? (
                <select value={choices[selectedChoiceIndex]?.choice_id}>
                    {choices.map((choice) => (
                        <option key={choice.choice_id} value={choice.choice_id}>
                            {choice.choice_text}
                        </option>
                    ))}
                </select>
            ) : isTextComplete ? (
                <button onClick={handleNext} className="next-button2">
                    Next
                </button>
            ) : null}
        </>
    )}
</div>

      </div>
      <audio
          ref={audioRef}
          src={currentMusic}
          autoPlay={isMusicPlaying}
      />

    </div>
  );
          }      

export default PassageWindow;

// ________________________________________________________
// ________________________________________________________
// ________________________________________________________
// ________________________________________________________
// import React, { useState, useEffect, useRef } from 'react';
// import './passageWindow.css';
// import illustration1 from '../images/girl-sleeping.jpg';
// import illustration2 from '../images/girl-awaken.jpg';
// import illustration3 from '../images/parchment-intro.jpg';
// // import { animateScroll as scroll } from 'react-scroll';

// const illustrations = [
//   illustration1,
//   illustration2,
// ];

// const formatTextWithLineBreaks = (text) => {
//   let formattedText = text.replace(/<br>/g, '<br />');
//   formattedText = text.replace(/#/g, '5555');
//   return formattedText;
// };

// const PassageWindow = ({ passageId2 }) => {
//   const [textPassages, setTextPassages] = useState([]);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const currentPassage = textPassages[currentIndex];
//   const [displayText, setDisplayText] = useState('');
//   const textRef = useRef(null);
//   const textIndexRef = useRef(0);  // Référence pour le textIndex
//   const [isTextComplete, setIsTextComplete] = useState(false);
//   // const hashText = useRef(false)

//   useEffect(() => {
//   const timer = setInterval(() => {
//   if (currentPassage && textIndexRef.current <= currentPassage.passage_text.length-1) {
//   // hashText.current = false
//   setDisplayText(prevDisplayText => {
//   const charToAdd = currentPassage.passage_text[textIndexRef.current-1];
//   if(charToAdd === '#') {
//   setIsTextComplete(true)
//   clearInterval(timer);
//   // hashText.current = true
//   }
//   return formatTextWithLineBreaks(prevDisplayText + charToAdd);
//   });

//       textIndexRef.current++;
//     } else {
//       setIsTextComplete(true);
//       // hashText.current = false
//       // textIndexRef.current--;
//       clearInterval(timer);
//     }
//   }, 50);  // Vitesse d'affichage du texte.

//   return () => {
//     textIndexRef.current = 0;  // Réinitialisation de l'index de texte lors du nettoyage
//     clearInterval(timer);
//   };
//   }, [currentPassage]);

//   useEffect(() => {
//   if (textRef.current) {
//   textRef.current.scrollTop = textRef.current.scrollHeight;
//   }
//   }, [displayText]);

//   useEffect(() => {
//   const fetchPassages = async () => {
//   try {
//   const response = await fetch(`http://localhost:3000/passages`);
//   const allData = await response.json();
//   // console.log(allData)
//   const filteredData = allData.filter(passage => passage.id >= 6 && passage.id <= 13);
//   // console.log(filteredData);
//   filteredData.sort((a,b)=> a.id - b.id)
//   setTextPassages(filteredData);
//   } catch (error) {
//   console.error('Error fetching text passages:', error);
//   }
//   };
//   fetchPassages();
//   }, []);

//   const handleNext = () => {
//   setDisplayText('');
//   setIsTextComplete(false);
//   // if(hashText.current) {
//   //   // hashText.current = false
//   //   // return
//   // };
//   if (currentIndex < textPassages.length - 1) {
//   setCurrentIndex(prevIndex => prevIndex + 1);
//   } else {
//   // Gérez ce qui se passe à la fin des passages (aller à un autre écran, etc.)
//   }
//   setDisplayText(currentPassage.passage_text);
//   };

//   return (
//   <div className="passage-window">
//   <div className="illustration-container2" style={{ backgroundImage: `url(${illustration2})` }}></div>
//   <div className="text-container2">
//   <div className="parchment2 aaa2" id="parchment-id" ref={textRef}>
//   <p className="text2" dangerouslySetInnerHTML={{ __html: displayText }}></p>
//   {isTextComplete && <button onClick={handleNext} className="next-button2">Next</button>}
//   </div>
//   </div>
//   </div>
//   );
//   }

//   export default PassageWindow;
