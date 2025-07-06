import React from 'react'

const Hoc = (Oldcomponent) => {
    return (props)=>{
        console.log(props)
        const handleClick = (props)=>{
            console.log("BUTTON CLICKED", props);
        }

        return <Oldcomponent onClick={handleClick} {...props}/>
    }
}

export default Hoc