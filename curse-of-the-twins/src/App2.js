import React, { useState } from 'react';
import Home from './components/Home';
import Introduction from './components/Introduction';
import PassageWindow from './components/PassageWindow';
import ChoiceMenu from './components/ChoiceMenu';

const App = () => {
  const [currentComponent, setCurrentComponent] = useState('Home');
  const [passageId, setPassageId] = useState(1);

  // Define your choices array with appropriate data
  const yourChoicesArray = [
    { choice_id: 1, text: 'Choice 1', nextPassageId: 2 },
    { choice_id: 2, text: 'Choice 2', nextPassageId: 3 },
    // Add more choices as needed
  ];

  const handleNextComponent = () => {
    if (currentComponent === 'Home') {
      setCurrentComponent('Introduction');
    } else if (currentComponent === 'Introduction') { 
      setCurrentComponent('PassageWindow');
    } else if (currentComponent === 'PassageWindow') {
      setCurrentComponent('ChoiceMenu');
    } else {

    }
  };

  const handleOptionSelected = (selectedChoice) => {
    
    setPassageId(selectedChoice.nextPassageId);
    console.log("New passageId:", selectedChoice.nextPassageId); // Ajoutez ce log pour vérifier la mise à jour du passageId
    setCurrentComponent('PassageWindow'); 
    console.log("Option sélectionnée :", selectedChoice.text);
  };

  return (
    <div className="App">
      {currentComponent === 'Home' && <Home onNext={handleNextComponent} />}
      {currentComponent === 'Introduction' && <Introduction onNext={handleNextComponent} />}
      {currentComponent === 'PassageWindow' && (
        <PassageWindow passageId={passageId} onNextPassage={handleNextComponent} />
      )}
      {currentComponent === 'ChoiceMenu' && (
        <ChoiceMenu choices={yourChoicesArray} onOptionSelected={handleOptionSelected} />
      )}
  </div>
  );
};

export default App;
