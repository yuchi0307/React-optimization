import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !=="";
  const nameInputIsInvalid = enteredNameTouched && !enteredNameIsValid;
  
  let formIsValid = false;

    if (enteredNameIsValid) //如果有很多欄位，通通放這邊判斷就好
    {
      formIsValid = true
    }
  

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = event =>{
    setEnteredNameTouched(true);
  }


  const formSubmitHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
   if(!enteredNameIsValid)
    {
      return;
    }
    setEnteredName("");
    setEnteredNameTouched(false);
  };
 

  const nameInputClasses = nameInputIsInvalid ? "form-control invalid" : "form-control";
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses }>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBliur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && <p className='error-text'>name can't be empty</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;


