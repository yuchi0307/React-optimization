import { useState } from 'react';

const useInput =(validateValue)=>{
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const enteredValueIsValid = validateValue(enteredValue);
  const hasError = !enteredValueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () =>{
    setEnteredValue("");
    setIsTouched(false);
  }
  return{
      value: enteredValue,
      isValid: valueIsValid,
      hasError, //意即 hasError: hasError 
      valueChangeHandler,
      inputBlurHandler,
      reset
  }
}


export default useInput;