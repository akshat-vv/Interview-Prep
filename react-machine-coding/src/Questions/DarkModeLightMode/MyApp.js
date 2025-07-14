import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import './style.css'
import { ThemeContext, ThemeContextProvider } from "./Context/themeContext";

export const MyApp = () => {

  return (
    <ThemeContextProvider>
    <div className="myapp">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
    </ThemeContextProvider>

  );
};
