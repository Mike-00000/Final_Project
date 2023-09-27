import React, { useState, createContext } from 'react';
import Home from './components/Home';
import Introduction from './components/Introduction';
import PassageWindow from './components/PassageWindow';
import ChoiceMenu from './components/ChoiceMenu';

export const AppContext=createContext("")

const App = () => {
  const [currentComponent, setCurrentComponent] = useState('Home');
  const [passageIdfordb, setPassageIdfordb] = useState(0);
  const [passageId, setPassageId] = useState(0);
  const [passageId2, setPassageId2] = useState(0);


  // Define your choices array with appropriate data
  const yourChoicesArray = [
    { choice_id: 1, text: 'Choice 1', nextPassageId: 2 },
    { choice_id: 2, text: 'Choice 2', nextPassageId: 3 },
    // Add more choices as needed
  ];

  const handleNextComponent = () => {
    console.log("testttttttttttttttttttttt", currentComponent);
    // if (currentComponent === 'Home') {
    //   setCurrentComponent('Introduction');
    // } else if (currentComponent === 'Introduction') { 
    //   setCurrentComponent('PassageWindow');
    // } else if (currentComponent === 'PassageWindow') {
    //   setCurrentComponent('ChoiceMenu');
    // } else {

    // }
    setPassageId(0)
    setPassageIdfordb(passageIdfordb+1)
    setCurrentComponent('PassageWindow');
  };

  const handleOptionSelected = (selectedChoice) => {
    
    setPassageIdfordb(selectedChoice.nextPassageId);
    console.log("New passageId:", selectedChoice.nextPassageId); // Ajoutez ce log pour vérifier la mise à jour du passageId
    setCurrentComponent('PassageWindow'); 
    console.log("Option sélectionnée :", selectedChoice.text);
  };

  return (
    <AppContext.Provider value={{handleNextComponent,passageIdfordb, setPassageIdfordb,passageId, setPassageId, passageId2, setPassageId2}}>
    <div className="App">
      {currentComponent === 'Home' && <Home onNext={handleNextComponent} key={1}/>}
      {currentComponent === 'Introduction' && <Introduction handleNextComponent={handleNextComponent} key={2}/>}
      {currentComponent === 'PassageWindow' && (
        <PassageWindow passageId2={passageId2} onNextPassage={handleNextComponent} key={3}/>
      )}
      {currentComponent === 'ChoiceMenu' && (
        <ChoiceMenu choices={yourChoicesArray} onOptionSelected={handleOptionSelected} key={4}/>
      )}
  </div>
  </AppContext.Provider>
  );
};

export default App;


// ___________________________________________________________________________________



// import React, { useState, useEffect, createContext } from 'react';
// import Home from './components/Home';
// import Introduction from './components/Introduction';
// import PassageWindow from './components/PassageWindow';
// import ChoiceMenu from './components/ChoiceMenu';

// export const AppContext = createContext("");

// const App = () => {
//   const [currentComponent, setCurrentComponent] = useState('Home');
//   const [passageIdfordb, setPassageIdfordb] = useState(0);
//   const [passageId, setPassageId] = useState(0);
//   const [passageId2, setPassageId2] = useState(0);
//   const [introductionPassages, setIntroductionPassages] = useState([]);
//   const [yourChoicesArray, setYourChoicesArray] = useState([]);

//   useEffect(() => {
//     const fetchIntroductionPassages = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/passages`);
//         const data = await response.json();
//         console.log("Données de passage récupérées avec succès :", data); // Ajoutez ce log pour vérifier les données récupérées
//         if (Array.isArray(data)) {
//           setIntroductionPassages(data);
//         }
//         console.log("testttttt2", setIntroductionPassages);
//       } catch (error) {
//         console.error('Error fetching introduction passages:', error);
//       }
//     };

//     // const fetchChoices = async () => {
//     //   try {
//     //     const response = await fetch(`http://localhost:3000/choices`);
//     //     const data = await response.json();
//     //     console.log("Choices data:", data);

//     //     if (Array.isArray(data)) {
//     //       setYourChoicesArray(data);
//     //     }
//     //   } catch (error) {
//     //     console.error('Error fetching choices:', error);
//     //   }
//     // };

//     fetchIntroductionPassages();
//     // fetchChoices();
//   }, []);

//   const handleNextComponent = () => {
//         console.log("testttttttttttttttttttttt", currentComponent);
//         if (currentComponent === 'Home') {
//           setCurrentComponent('Introduction');
//         } else if (currentComponent === 'Introduction') { 
//           setCurrentComponent('PassageWindow');
//         } else if (currentComponent === 'PassageWindow') {
//           setCurrentComponent('ChoiceMenu');
//         } else {
    
//         }
//         setPassageId(0)
//         setPassageIdfordb(passageIdfordb+1)
//         setCurrentComponent('PassageWindow');
//       };

//       const handleOptionSelected = (selectedChoice) => {
    
//             setPassageIdfordb(selectedChoice.nextPassageId);
//             console.log("New passageId:", selectedChoice.nextPassageId); // Ajoutez ce log pour vérifier la mise à jour du passageId
//             setCurrentComponent('PassageWindow'); 
//             console.log("Option sélectionnée :", selectedChoice.text);
//           };

//   return (
//     <AppContext.Provider value={{ handleNextComponent, passageIdfordb, setPassageIdfordb, passageId, setPassageId, passageId2, setPassageId2 }}>
//       <div className="App">
//         {currentComponent === 'Home' && <Home onNext={handleNextComponent} introductionPassages={introductionPassages} key={1} />}
//         {currentComponent === 'Introduction' && <Introduction handleNextComponent={handleNextComponent} introductionPassages={introductionPassages} key={2} />}
//         {currentComponent === 'PassageWindow' && (
//           <PassageWindow passageId2={passageId2} onNextPassage={handleNextComponent} introductionPassages={introductionPassages} key={3} />
//         )}
//         {currentComponent === 'ChoiceMenu' && (
//           <ChoiceMenu choices={yourChoicesArray} onOptionSelected={handleOptionSelected} key={4} />
//         )}
//       </div>
//     </AppContext.Provider>
//   );
// };

// export default App;
