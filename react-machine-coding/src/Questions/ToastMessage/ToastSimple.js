import React, { useRef, useState } from 'react'


const ToastComponent = ({message = "Info Message", type='info', onClose})=>{
    return <div className={`toast ${type}`}>
        <p>{message}</p>
        <span onClick={onClose}>x</span>
    </div>
}

const ToastSimple = () => {

    const [toastData, setToastData] = useState(null);
    const timeoutRef = useRef(null);

    const handleAdd =(message, type)=>{
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setToastData({message,type});

       timeoutRef.current = setTimeout(()=>{setToastData(null); timeoutRef.current = null},3000)
    }

  return (
    <div>
        {toastData && <ToastComponent message={toastData.message} type={toastData.type} onClose={() => setToastData(null)} />}
        <button onClick={()=>handleAdd("Success Message", "success")}>Success Toast</button>
        <button onClick={()=>handleAdd("Warning Message", "warning")}>Warning Toast</button>
        <button onClick={()=>handleAdd("Info Message", "info")}>Info Toast</button>
        <button onClick={()=>handleAdd("Error Message", "error")}>Error Toast</button>
    </div>
  )
}

export default ToastSimple