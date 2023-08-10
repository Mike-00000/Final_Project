import React, { useState } from 'react';

const currentComponent = 'Home';
const setCurrentComponent = (newComponent) => {
  currentComponent = newComponent;
};

export const handleNextComponent = () => {
  if (currentComponent === 'Home') {
    setCurrentComponent('Introduction');
  } else if (currentComponent === 'Introduction') { 
    setCurrentComponent('PassageWindow');
  } else if (currentComponent === 'PassageWindow') {
    setCurrentComponent('ChoiceMenu');
  } else {

  }
};

export { currentComponent, setCurrentComponent };
