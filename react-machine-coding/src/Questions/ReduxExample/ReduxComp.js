import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, reset } from './store';

const ReduxComp = () => {
    const count = useSelector((state)=>state.counter.count);
    const dispatch = useDispatch();


  return (
    <div>
        <h1>{count}</h1>
        <button onClick={() => dispatch(increment())}>➕ Increment</button>
      <button onClick={() => dispatch(decrement())}>➖ Decrement</button>
      <button onClick={() => dispatch(reset())}>🔁 Reset</button>
    </div>
  )
}

export default ReduxComp