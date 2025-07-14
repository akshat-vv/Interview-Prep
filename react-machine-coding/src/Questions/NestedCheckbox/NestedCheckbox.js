import { useState } from 'react';
import data from './data';
import NesteCheckboxComponent from './NesteCheckboxComponent';

const NestedCheckbox = () => {
    const [checkboxState, setCheckboxState] = useState(data);

    return <NesteCheckboxComponent data={checkboxState} setCheckboxState={setCheckboxState} fullTree={checkboxState}/>
}

export default NestedCheckbox