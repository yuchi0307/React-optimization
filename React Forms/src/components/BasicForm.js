//import { useState } from "react";
import useInput from '../hooks/use-input';

const BasicForm = (props) => {

      const {
        value: enteredFirstName,
        //isTouched: firstNameIsTouched, 這是多餘的
        isValid: firstNameValid, //只需要這個
        inputChangeHandler: firstNameChanged,
        inputBlurHandler: firstNameTouched,
        hasError: firstNameError,
        reset: resetEnteredFirstName,
      } = useInput(value => value.trim()!=='')


  const nameInputClass = firstNameError ? 'form-control invalid':'form-control';
 
  let formIsValid = false; //不用放到其他function內
  if(firstNameValid){
        formIsValid = true;
      }

  const formSubmitHandler = event =>{
    event.preventDefault();
    resetEnteredFirstName();
  }

  
  return (
    <form onSubmit={formSubmitHandler}> {/*確認鍵是設在表單tag，不是button*/}
        <div className={nameInputClass}> {/* 在html tag中可以直接{}寫JSX */}
          <label htmlFor='name'>First Name</label>
          <input 
            type='text' 
            id='name' 
            onChange={firstNameChanged}
            onBlur={firstNameTouched}
            value={enteredFirstName}
          />
          {firstNameError && <p className='error-text'>name can't be empty!</p>}
        </div>
        <div className='form-control'>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' />
        </div>

      <div className='form-control'>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' />
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
