import React from 'react';
import ReactDOM from "react-dom";
import './modal.css'

const MyModal = ({isOpen, onClose, children}) => {
    if(!isOpen) return null;

    return ReactDOM.createPortal(
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e)=>e.stopPropagation()}> 
                 <button className="modal-close" onClick={onClose}>x</button>
                 {children}
            </div>
        </div>,document.body
    )
}

export default MyModal