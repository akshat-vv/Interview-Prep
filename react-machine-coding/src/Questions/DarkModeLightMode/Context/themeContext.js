import { createContext, useState , useContext, useEffect} from "react";


export const ThemeContext = createContext({});

export const useTheme = ()=>{
    return useContext(ThemeContext)
}


export const ThemeContextProvider = ({children})=>{
    const [isLight, setIsLight] = useState(()=>{
        const stored = localStorage.getItem('theme')
        return stored === 'light' ? true : false
    });

    const handleThemeChange =() => {
        setIsLight(prev=>!prev)
    }

    const theme = isLight ? 'light' : 'dark';

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme)
    },[isLight])
    
    return <ThemeContext.Provider value={{isLight, handleThemeChange}}>
        {children}
    </ThemeContext.Provider>
}