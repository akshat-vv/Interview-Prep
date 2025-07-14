import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { useTheme } from '../Context/themeContext';

const Navbar = () => {
    const {isLight, handleThemeChange} = useTheme();
    console.log(isLight, handleThemeChange);
  return (
    <nav className='navbar'>
        <div className='nav-link-container'>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
                  <button onClick={handleThemeChange}>Toggle Theme</button>
        </div>
    </nav>
  )
}

export default Navbar