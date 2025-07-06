import React from 'react'
import useModal from './useModal'
import MyModal from './MyModal';

const ModalExample = () => {
    const {isOpen, open, close} = useModal();
  return (
    <div>
        <h2>Reusable Modal</h2>

        <button onClick={open}>Open Modal</button>

        <MyModal isOpen={isOpen} onClose={close}>
            <h2>Hello from the modal 👋</h2>
            <p>This is reusable and managed by a custom hook.</p>
            <button onClick={close}>Close</button>
        </MyModal>

    </div>
  )
}

export default ModalExample