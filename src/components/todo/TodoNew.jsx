import { useState } from "react"

const TodoNew = (props) => {
  // useState hook, setValueInput is function
  const [valueInput, setValueInput] = useState("tung")
  const handleClick = () => {
    alert("click me")
  }
  // event meaning?
  const handleOnChange = (name) => {
    setValueInput(name);
  }
  
    return (
        <form action="" className="todo-app__form">
          <input type="text" name="" id="" className="todo-app__input" placeholder='Enter your task' onChange={(event) => handleOnChange(event.target.value)}/>
          <button className="todo-app__btn" onClick = {handleClick}>Add</button>
          
        </form>
    );
}
export default TodoNew;