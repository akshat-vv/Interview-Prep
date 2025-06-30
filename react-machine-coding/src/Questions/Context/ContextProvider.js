import React, { useState, useEffect } from 'react';
import ThemeContext from './themeContext';

const ThemeProvider = ({ children }) => {
  const [isLight, setIsLight] = useState(() => {
    // On first load, check localStorage
    const saved = localStorage.getItem('isLight');
    return saved !== null ? saved === 'true' : true; // default is true (light)
  });

  // Whenever isLight changes, update localStorage
  useEffect(() => {
    localStorage.setItem('isLight', isLight);
  }, [isLight]);

  return (
    <ThemeContext.Provider value={{ isLight, setIsLight }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
