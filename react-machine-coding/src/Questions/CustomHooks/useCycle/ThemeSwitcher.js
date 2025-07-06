import React, { useState } from 'react'
import useCycle from './useCycle';

const themes = ['light', 'dark', 'brown'];

const ThemeSwitcher = () => {

    const [theme, setTheme] = useCycle(themes);
  return (
    <div>
        <h2>{theme}</h2>
        <button onClick={setTheme}>Switch Theme</button>
    </div>
  )
}

export default ThemeSwitcher