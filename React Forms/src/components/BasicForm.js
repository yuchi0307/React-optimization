
//import { useState } from "react";
import useInput from '../hooks/use-input';

const isNotEmpty = value => value.trim()!==''; //這個function不會被rebuild,因此寫在component外
const isEmail = value => value.includes('@');

const BasicForm = (props) => {

      const {
        value: enteredFirstName,
        //isTouched: firstNameIsTouched, 這是多餘的
        isValid: firstNameValid, //只需要這個
        inputChangeHandler: firstNameChanged,
        inputBlurHandler: firstNameBlured,
        hasError: firstNameError,
        reset: resetEnteredFirstName,
      } = useInput(isNotEmpty)

      const {
        value: enteredLastName,
        isValid: lastNameValid, 
        inputChangeHandler: lastNameChanged,
        inputBlurHandler: lastNameBlured,
        hasError: lastNameError,
        reset: resetEnteredLastName,
      } = useInput(isNotEmpty)

      const {
        value: enteredEmail,
        isValid: emailValid, 
        inputChangeHandler: emailChanged,
        inputBlurHandler: emailBlured,
        hasError: emailError,
        reset: resetEmail,
      } = useInput(isEmail)

  let formIsValid = false; //不用放到其他function內
  if(firstNameValid && lastNameValid && emailValid){
        formIsValid = true;
      }

  const formSubmitHandler = event =>{
    event.preventDefault();

    if(!formIsValid) 
    {
      return;
    }

    console.log('submitted!')
    console.log(enteredFirstName, enteredLastName, enteredEmail);
    
    resetEnteredFirstName();
    resetEnteredLastName();
    resetEmail();
  }
  const firstNameClasses = firstNameError ? 'form-control invalid':'form-control';
  const lastNameClasses = lastNameError ? 'form-control invalid':'form-control';
  const emailClasses = emailError ? 'form-control invalid':'form-control';
 
  
  return (
    <form onSubmit={formSubmitHandler}> {/*確認鍵是設在表單tag，不是button*/}
      <div className='control-group'>
        <div className={firstNameClasses}> {/* 在html tag中可以直接{}寫JSX */}
          <label htmlFor='name'>First Name</label>
          <input 
            type='text' 
            id='name' 
            onChange={firstNameChanged}
            onBlur={firstNameBlured}
            value={enteredFirstName}
          />
          {firstNameError && <p className='error-text'>first name can't be empty!</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='name'>Last Name</label>
           <input 
            type='text' 
            id='name' 
            onChange={lastNameChanged}
            onBlur={lastNameBlured}
            value={enteredLastName}
          />
          {lastNameError && <p className='error-text'>last name can't be empty!</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' 
         id='email' 
         value={enteredEmail}
         onChange={emailChanged}
         onBlur={emailBlured}
         />
          {emailError && <p className='error-text'>e-mail address should have @!</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
