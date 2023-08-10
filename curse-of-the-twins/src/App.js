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
    
    setPassageId(selectedChoice.nextPassageId);
    console.log("New passageId:", selectedChoice.nextPassageId); // Ajoutez ce log pour vérifier la mise à jour du passageId
    setCurrentComponent('PassageWindow'); 
    console.log("Option sélectionnée :", selectedChoice.text);
  };

  return (
    <AppContext.Provider value={{handleNextComponent,passageIdfordb, setPassageIdfordb,passageId, setPassageId}}>
    <div className="App">
      {currentComponent === 'Home' && <Home onNext={handleNextComponent} key={1}/>}
      {currentComponent === 'Introduction' && <Introduction handleNextComponent={handleNextComponent} key={2}/>}
      {currentComponent === 'PassageWindow' && (
        <PassageWindow passageId={passageId} onNextPassage={handleNextComponent} key={3}/>
      )}
      {currentComponent === 'ChoiceMenu' && (
        <ChoiceMenu choices={yourChoicesArray} onOptionSelected={handleOptionSelected} key={4}/>
      )}
  </div>
  </AppContext.Provider>
  );
};

export default App;
