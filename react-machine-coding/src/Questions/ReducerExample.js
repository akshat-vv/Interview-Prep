import React, {act, useReducer} from 'react'

const initialState = {
    count: 0
}

function reducer(state, action) {
    switch(action.type){
        case 'increment':
            return {count : state.count + 1}
        case 'decrement':
            return {count : state.count - 1};
    }
}

const ReducerExample = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
        {state.count}
        <button onClick={()=>dispatch({type:'increment'})}>Add</button>
        <button onClick={()=>dispatch({type:'decrement'})}>Del</button>
    </div>
  )
}

export default ReducerExample