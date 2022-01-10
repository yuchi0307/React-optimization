import { useState } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
/*
用useReducer寫:

import { useState } from 'react';

const initialInputState = {
  value: '',
  isTouched: false
}

const inputStateReducer = (state, action) =>{
  if(action.type=='INPUT')
  { return {value: action.value, isTouched: state.isTouched}

  }
  if(action.type=='BLUR')
  {
    return {isTouched: true}
  }
  if(action.type=='RESET')
  {
    return {value: '', isTouched: false}
  }  
  return inputStateReducer
}

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const inputChangeHandler = (event) => {
    dispatch({type: 'INPUT', value: event.target.value})
  };

  const inputBlurHandler = (event) => {
    dispatch({typr: 'BLUR'})
  };

  const reset = () => {
    dispatch({type: 'RESET'})
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
*/
