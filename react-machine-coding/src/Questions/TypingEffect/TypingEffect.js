import React, { useEffect, useRef, useState } from 'react'
import './typer.css'

const TypingEffect = ({ content, delay }) => {
  const [displayText, setDisplayText] = useState("")

  const velocityRef = useRef({
    direction: 1,
    endIndex: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const { endIndex } = velocityRef.current;

      if (endIndex === content.length) {
        velocityRef.current.direction = -1;
      } else if (endIndex === 0) {
        velocityRef.current.direction = 1;
      }

      velocityRef.current.endIndex += velocityRef.current.direction;

      setDisplayText(content.slice(0, velocityRef.current.endIndex));
    }, delay);

    return () => clearInterval(interval);
  }, [content, delay]);

  return (
    <h1>
      <span>{displayText}</span>
      <span className='typer'>|</span>
    </h1>
  );
};

export default TypingEffect;
