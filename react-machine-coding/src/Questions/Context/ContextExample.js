import React, { useContext } from 'react';
import ThemeContext from './themeContext';

const ContextExample = () => {
  const { isLight, setIsLight } = useContext(ThemeContext);

  return (
    <div style={{
      backgroundColor: isLight ? '#fff' : '#222',
      color: isLight ? '#000' : '#fff',
      padding: '20px'
    }}>
      <h2>{isLight ? 'Light Mode' : 'Dark Mode'}</h2>
      <button onClick={() => setIsLight(prev => !prev)}>
        Toggle Theme
      </button>
    </div>
  );
};

export default ContextExample;
