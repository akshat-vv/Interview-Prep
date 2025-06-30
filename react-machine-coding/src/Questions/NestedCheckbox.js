import React from 'react'

const NestedCheckbox = ({node}) => {
  return (
        <div style={{marginLeft:'20px'}}>
            <input type='checkbox'/>
            <span>{node.name}</span>
            {
                node.children && node.children.map((child)=><NestedCheckbox node={child}/>)
            }
    </div>
  )

}

export default NestedCheckbox