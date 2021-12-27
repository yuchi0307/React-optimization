import { useState, useRef } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameValid, setEnteredNameValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const inputRef = useRef();

  const nameInputChangeHandler = (event) => {
    setEnteredNameValid(event.target.value);
  };


  const formSubmitHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
    if(enteredName.trim() === "")
    {
      setEnteredNameValid(false);
      return; //如果輸入空值直接跳離此function，不會執行底下的 
    }
    setEnteredNameValid(true);
    console.log(enteredName);

    const look = inputRef.current.value;
    console.log(look);
    setEnteredName("");
  };
  const nameInputIsInvalid = enteredNameTouched && !enteredNameValid;

  const nameInputClasses = nameInputIsInvalid ? "form-control invalid" : "form-control";
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses }>
        <label htmlFor="name">Your Name</label>
        <input
          ref={inputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && <p className='error-text'>name can't be empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
