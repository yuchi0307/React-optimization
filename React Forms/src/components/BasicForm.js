import { useState } from "react";

const BasicForm = (props) => {

  const [enteredName, setEnteredName]= useState('');
  const [nameInputIsTouched, setNameInputIsTouched] = useState(false);

  const nameIsValid = enteredName.trim()!=="";
  const nameIsInValid = nameInputIsTouched && !enteredName;

  const enteredNameChangeHandler = event =>{
    setEnteredName(event.target.value);
  }
  const nameInputBlur = event =>{
    setNameInputIsTouched(true);
  }

  const nameInputClass = nameIsInValid ? 'form-control invalid':'form-control';
 
  let formIsValid = false; //不用放到其他function內
  if(nameIsValid){
        formIsValid = true;
      }

  const formSubmitHandler = event =>{
    event.preventDefault();
    
  }

  
  return (
    <form onSubmit={formSubmitHandler}> {/*確認鍵是設在表單tag，不是button*/}
        <div className={nameInputClass}> {/* 在html tag中可以直接{}寫JSX */}
          <label htmlFor='name'>First Name</label>
          <input 
            type='text' 
            id='name' 
            onChange={enteredNameChangeHandler}
            onBlur={nameInputBlur}
            value={enteredName}
          />
          {nameIsInValid && <p className='error-text'>name can't be empty!</p>}
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
