import React, {useState} from 'react'

const AccordionComponent = ({items}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleItem = (index) => {
    if (index === expandedIndex) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <button onClick={() => toggleItem(index)}>{item.title}</button>
          {index === expandedIndex && <div>{item.content}</div>}
        </div>
      ))}
    </div>
  );
}

export default AccordionComponent