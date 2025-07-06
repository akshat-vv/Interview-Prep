import React from 'react'

const Button = ({ onClick, children}) => {
  return (
    <button onClick={onClick} id="button1">{children}</button>
  )
}

export default Button