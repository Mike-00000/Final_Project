// import React, { useState, useEffect, useContext } from "react";
// import "./introduction.css";
// import illustration1 from "../images/parchment-intro.jpg";
// import illustration2 from "../images/forest-cabin.jpg";
// import illustration3 from "../images/loan_shark-and-father.jpg";
// import illustration4 from "../images/bandits-attack-father.jpg";
// import illustration5 from "../images/hidden-girl.jpg";
// import illustration6 from "../images/girl-escape.jpg";
// import { animateScroll as scroll } from "react-scroll";
// // import { handleNextComponent } from '../App';
// import { AppContext } from "../App";

// const backgroundIllustration = illustration1;

// const illustrations = [
//   illustration2,
//   illustration3,
//   illustration4,
//   illustration5,
//   illustration6,
// ];

// const charactersPerFrameArray = [50, 30, 20];

// const Introduction = (props) => {
//   console.log("Introduction props", props);
//   const [displayText, setDisplayText] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [currentIllustration, setCurrentIllustration] = useState(
//     illustrations[0]
//   );
//   const [introductionPassages, setIntroductionPassages] = useState([]);
//   const [passageId, setPassageId] = useState(1);
//   const [showNextButton, setShowNextButton] = useState(true);

//   const [isMusicPlaying, setIsMusicPlaying] = useState(true);
//   const { handleNextComponent, passageIdfordb } = useContext(AppContext);
//   const formatTextWithLineBreaks = (text) => {
//     const formattedText = text.replace(/<br>/g, "<br/>");
//     return formattedText;
//   };

//   const textRef = React.useRef(null);

//   useEffect(() => {
//     const fetchIntroductionPassages = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/passages/${passageIdfordb}`
//         );
//         const data = await response.json();
//         // console.log("testttttt", data);

//         if (Array.isArray(data)) {
//           setIntroductionPassages(data);
//         }
//         // console.log("testttttt2", setIntroductionPassages);
//       } catch (error) {
//         // console.error('Error fetching introduction passages:', error);
//       }
//     };

//     fetchIntroductionPassages();
//   }, [passageId]);

//   useEffect(() => {
//     const passageText =
//       introductionPassages?.find((passage) => passage.id === passageId)
//         ?.passage_text || "";
//     // console.log("testttttt3", passageText);

//     const intervalId = setInterval(() => {
//       const charactersPerFrame =
//         charactersPerFrameArray.find(
//           (value, index) => index === passageId - 1
//         ) || 100;
//       if (currentIndex < passageText.length) {
//         setDisplayText((prevText) => prevText + passageText[currentIndex]);
//         setCurrentIndex((prevIndex) => prevIndex + 1);
//       } else {
//         clearInterval(intervalId);

//         if (currentIllustration !== illustrations[illustrations.length - 1]) {
//           console.log("- inside if");
//           const DELAY_BEFORE_NEXT_PASSAGE = 6700;
//           console.log(passageId);
//           if (passageId === 0) {
//             console.log("-- inside if");
//             setTimeout(() => {
//               const currentIllustrationIndex =
//                 illustrations.indexOf(currentIllustration);

//               console.log({ currentIllustrationIndex });
//               console.log("== 1");
//               setCurrentIllustration(
//                 illustrations[currentIllustrationIndex + 1]
//               );
//               console.log("== 2");
//               setCurrentIndex(0);
//               console.log("== 3");
//               setDisplayText("");
//               console.log("== 4");
//               setPassageId((prevPassageId) => {
//                 console.log({ prevPassageId });

//                 return prevPassageId + 1;
//               });
//             }, 46400);
//           } else {
//             console.log("-- inside else");
//             setTimeout(() => {
//               const currentIllustrationIndex =
//                 illustrations.indexOf(currentIllustration);

//               console.log({ currentIllustrationIndex });
//               setCurrentIllustration(
//                 illustrations[currentIllustrationIndex + 1]
//               );
//               setCurrentIndex(0);
//               setDisplayText("");
//               setPassageId((prevPassageId) => prevPassageId + 1);
//             }, DELAY_BEFORE_NEXT_PASSAGE);
//           }
//         } else {
//           setShowNextButton(true);
//         }
//       }
//     }, 75);

//     return () => clearInterval(intervalId);
//   }, [currentIndex, currentIllustration, introductionPassages, passageId]);

//   useEffect(() => {
//     textRef.current.scrollTop = textRef.current.scrollHeight;
//   }, [displayText]);

//   return (
//     <div className="container">
//       <div
//         className="illustration-container"
//         style={{ backgroundImage: `url(${currentIllustration})` }}
//       />
//       <div className="text-container">
//         <div className="parchment aaa" id="parchment-id" ref={textRef}>
//           <p
//             className="text"
//             dangerouslySetInnerHTML={{
//               __html: formatTextWithLineBreaks(displayText),
//             }}
//           />
//           {showNextButton && (
//             <button onClick={handleNextComponent} className="next-button">
//               Next
//             </button>
//           )}
//         </div>
//       </div>
//       <audio src="/RPG intro 100 BPM2.wav" autoPlay={isMusicPlaying} />
//     </div>
//   );
// };

// export default Introduction;

import React, { useState, useEffect, useContext } from "react";
import "./introduction.css";
import illustration1 from "../images/parchment-intro.jpg";
import illustration2 from "../images/forest-cabin.jpg";
import illustration3 from "../images/loan_shark-and-father.jpg";
import illustration4 from "../images/bandits-attack-father.jpg";
import illustration5 from "../images/hidden-girl.jpg";
import illustration6 from "../images/girl-escape.jpg";
import { AppContext } from "../App";

const backgroundIllustration = illustration1;

const illustrations = [illustration2, illustration3, illustration4, illustration5, illustration6];

const charactersPerFrameArray = [50, 30, 20];

const Introduction = (props) => {
  console.log("Introduction props", props);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIllustration, setCurrentIllustration] = useState(illustrations[0]);
  const [introductionPassages, setIntroductionPassages] = useState([]);
  const [passageId, setPassageId] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const { handleNextComponent, passageIdfordb } = useContext(AppContext);

  const formatTextWithLineBreaks = (text) => {
    const formattedText = text.replace(/<br>/g, "<br/>");
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
        console.error("Error fetching introduction passages:", error);
      }
    };

    fetchIntroductionPassages();
  }, [passageId]);

  useEffect(() => {
  if (passageId < introductionPassages.length) {
    const passageText = introductionPassages[passageId].passage_text;
    const charactersPerFrame = charactersPerFrameArray[passageId] || 100;

    const intervalId = setInterval(() => {
      if (currentIndex < passageText.length) {
        setDisplayText((prevText) => prevText + passageText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(intervalId);

        // Move to the next passage after 6 seconds, unless it's the last passage
        if (passageId < introductionPassages.length - 1) {
          setTimeout(() => {
            setShowNextButton(false);
            setCurrentIndex(0);
            setDisplayText("");
            // Update the illustration
            if (passageId + 1 < illustrations.length) {
              setCurrentIllustration(illustrations[passageId + 1]);
            }
            setPassageId((prevPassageId) => prevPassageId + 1);
          }, 3500);
        } else {
          // It's the last passage of the introduction, show the "Next" button
          setShowNextButton(true);
        }
      }
    }, 75);

    return () => clearInterval(intervalId);
  }
}, [currentIndex, passageId, introductionPassages]);


  useEffect(() => {
    textRef.current.scrollTop = textRef.current.scrollHeight;
  }, [displayText]);
  
  return (
    <div className="container">
      <div className="illustration-container" style={{ backgroundImage: `url(${currentIllustration})` }} />
      <div className="text-container">
        <div className="parchment aaa" id="parchment-id" ref={textRef}>
          <p
            className="text"
            dangerouslySetInnerHTML={{
              __html: formatTextWithLineBreaks(displayText),
            }}
          />
          {showNextButton && passageId === introductionPassages.length - 1 && (
            <button onClick={handleNextComponent} className="next-button">
              Next
            </button>
          )}
        </div>
      </div>
      <audio src="/RPG intro 100 BPM2.wav" autoPlay={isMusicPlaying} />
    </div>
  );
};

export default Introduction;




// Après ça, on pourra passer au déploiement (il me semble que tu m'avais proposé l'autre fois au tel de m'aider à le faire, si je me souviens bien).


// ____________________________________________________________________________________

// import React, { useState, useEffect, useContext } from 'react';
// import './introduction.css';
// import illustration1 from '../images/parchment-intro.jpg';
// import illustration2 from '../images/forest-cabin.jpg';
// import illustration3 from '../images/loan_shark-and-father.jpg';
// import illustration4 from '../images/bandits-attack-father.jpg';
// import illustration5 from '../images/hidden-girl.jpg';
// import illustration6 from '../images/girl-escape.jpg';
// import { animateScroll as scroll } from 'react-scroll';
// // import { handleNextComponent } from '../App';
// import { AppContext } from '../App';

// const backgroundIllustration = illustration1;

// const illustrations = [
//   illustration2,
//   illustration3,
//   illustration4,
//   illustration5,
//   illustration6,
// ];

// const charactersPerFrameArray = [50, 30, 20]; 

// const Introduction = (props) => {
//   console.log("Introduction props", props);
//   const [displayText, setDisplayText] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [currentIllustration, setCurrentIllustration] = useState(illustrations[0]);
//   const [introductionPassages, setIntroductionPassages] = useState([]);
//   const [passageId, setPassageId] = useState(1);
//   const [showNextButton, setShowNextButton] = useState(true);

//   const [isMusicPlaying, setIsMusicPlaying] = useState(true);
//   const { handleNextComponent, passageIdfordb } = useContext(AppContext);
//   const formatTextWithLineBreaks = (text) => {
//     const formattedText = text.replace(/<br>/g, '<br/>');
//     return formattedText;
//   };

//   const textRef = React.useRef(null);

//   useEffect(() => {
//     const fetchIntroductionPassages = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/passages/${passageIdfordb}`);
//         const data = await response.json();
//         console.log("testttttt", data);

//         if (Array.isArray(data)) {
//           setIntroductionPassages(data);
//         }
//         console.log("testttttt2", setIntroductionPassages);

//       } catch (error) {
//         console.error('Error fetching introduction passages:', error);
//       }
//     };

//     fetchIntroductionPassages();
//   }, [passageId]);

//   useEffect(() => {
//     const passageText = introductionPassages?.find((passage) => passage.id === passageId)?.passage_text || '';
//     console.log("testttttt3", passageText);

//     const intervalId = setInterval(() => {
//       const charactersPerFrame = charactersPerFrameArray.find((value, index) => index === passageId - 1) || 100;
//       if (currentIndex < passageText.length) {
//         setDisplayText((prevText) => prevText + passageText[currentIndex]);
//         setCurrentIndex((prevIndex) => prevIndex + 1);
//       } else {
//         clearInterval(intervalId);
//         if (currentIllustration !== illustrations[illustrations.length - 1]) {
//           const DELAY_BEFORE_NEXT_PASSAGE = 6700;
//           setTimeout(() => {
//             const currentIllustrationIndex = illustrations.indexOf(currentIllustration);
//             setCurrentIllustration(illustrations[currentIllustrationIndex + 1]);
//             setCurrentIndex(0);
//             setDisplayText('');
//             setPassageId((prevPassageId) => prevPassageId + 1);
//           }, DELAY_BEFORE_NEXT_PASSAGE);
//         } else {
//           setShowNextButton(true); 
//         }
//       }
//     }, 75);

//     return () => clearInterval(intervalId);
//   }, [currentIndex, currentIllustration, introductionPassages, passageId]);

//   useEffect(()=> {
//     textRef.current.scrollTop = textRef.current.scrollHeight
//   },[displayText])

//   return (
//     <div className="container">
//       <div className="illustration-container" style={{ backgroundImage: `url(${currentIllustration})` }} />
//       <div className="text-container">
//         <div className="parchment aaa" id="parchment-id" ref={textRef}>
//           <p className="text"  dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(displayText)   }} />
//         {showNextButton && <button onClick= {handleNextComponent} className="next-button">Next</button>}
//         </div>
//       </div>
//       <audio src="/RPG intro 100 BPM2.wav" autoPlay={isMusicPlaying} />
//     </div>
//   );
// };

// export default Introduction;


// ________________________________________________________________________________


// import React, { useState, useEffect, useContext } from 'react';
// import './introduction.css';
// import illustration1 from '../images/parchment-intro.jpg';
// import illustration2 from '../images/forest-cabin.jpg';
// import illustration3 from '../images/loan_shark-and-father.jpg';
// import illustration4 from '../images/bandits-attack-father.jpg';
// import illustration5 from '../images/hidden-girl.jpg';
// import illustration6 from '../images/girl-escape.jpg';
// import { animateScroll as scroll } from 'react-scroll';
// // import { handleNextComponent } from '../App';
// import { AppContext } from '../App';

// const backgroundIllustration = illustration1;

// const illustrations = [
//   illustration2,
//   illustration3,
//   illustration4,
//   illustration5,
//   illustration6,
// ];

// const charactersPerFrameArray = [50, 30, 20]; 

// const Introduction = (props) => {
//   console.log("Introduction props", props);
//   const { passageIdfordb, introductionPassages, handleNextComponent } = props;

//   const [displayText, setDisplayText] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [currentIllustration, setCurrentIllustration] = useState(illustrations[0]);
//   // const [introductionPassages, setIntroductionPassages] = useState([]);
//   const [passageId, setPassageId] = useState(1);
//   const [showNextButton, setShowNextButton] = useState(true);

//   const [isMusicPlaying, setIsMusicPlaying] = useState(true);
//   // const { handleNextComponent, passageIdfordb } = useContext(AppContext);
//   const formatTextWithLineBreaks = (text) => {
//     const formattedText = text.replace(/<br>/g, '<br/>');
//     return formattedText;
//   };

//   const textRef = React.useRef(null);


//   useEffect(() => {
//     const passageText = introductionPassages?.find((passage) => passage.id === passageId)?.passage_text || '';
//     console.log("Passage Text:", passageText); // Ajoutez cette ligne pour vérifier le texte du passage
//     console.log("testttttt3", passageText);

//     const intervalId = setInterval(() => {
//       const charactersPerFrame = charactersPerFrameArray.find((value, index) => index === passageId - 1) || 100;
//       if (currentIndex < passageText.length) {
//         setDisplayText((prevText) => prevText + passageText[currentIndex]);
//         setCurrentIndex((prevIndex) => prevIndex + 1);
//       } else {
//         clearInterval(intervalId);
//         if (currentIllustration !== illustrations[illustrations.length - 1]) {
//           const DELAY_BEFORE_NEXT_PASSAGE = 6700;
//           setTimeout(() => {
//             const currentIllustrationIndex = illustrations.indexOf(currentIllustration);
//             setCurrentIllustration(illustrations[currentIllustrationIndex + 1]);
//             setCurrentIndex(0);
//             setDisplayText('');
//             setPassageId((prevPassageId) => prevPassageId + 1);
//           }, DELAY_BEFORE_NEXT_PASSAGE);
//         } else {
//           setShowNextButton(true); 
//         }
//       }
//     }, 75);

//     return () => clearInterval(intervalId);
//   }, [currentIndex, currentIllustration, introductionPassages, passageId]);

//   useEffect(()=> {
//     textRef.current.scrollTop = textRef.current.scrollHeight
//   },[displayText])

//   return (
//     <div className="container">
//       <div className="illustration-container" style={{ backgroundImage: `url(${currentIllustration})` }} />
//       <div className="text-container">
//         <div className="parchment aaa" id="parchment-id" ref={textRef}>
//           <p className="text"  dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(displayText)   }} />
//         {showNextButton && <button onClick= {handleNextComponent} className="next-button">Next</button>}
//         </div>
//       </div>
//       <audio src="/RPG intro 100 BPM2.wav" autoPlay={isMusicPlaying} />
//     </div>
//   );
// };

// export default Introduction;
