import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const useCycle = (themes) => {

    const [index,setIndex ] = useState(0);


    const next = ()=>{
        setIndex((i)=> (i + 1) % themes.length)
    }

    return [themes[index], next];
}

export default useCycle