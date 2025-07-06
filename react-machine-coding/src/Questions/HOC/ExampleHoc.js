import React from 'react';
import Hoc from './Hoc';
import Button from './Button';

const NewComponent = Hoc(Button);

const ExampleHoc = () => {
  return (
    <>
        <NewComponent>Click Me</NewComponent>
        <NewComponent>Click Me 2</NewComponent>
    </>
  )
}

export default ExampleHoc