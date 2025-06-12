import { useState } from "react"

const TodoNew = (props) => {
  const {addNewtodo} = props;
  // useState hook, setValueInput is function
  const [valueInput, setValueInput] = useState("tung")
  const handleClick = () => {
    addNewtodo(valueInput);
    setValueInput("")
  }
  // event meaning?
  const handleOnChange = (name) => {
    setValueInput(name);
  }
  
    return (
        <form action="#!" className="todo-app__form">
          <input type="text" name="" id="" className="todo-app__input" placeholder='Enter your task' onChange={(event) => handleOnChange(event.target.value)} value={valueInput}/>
          <button className="todo-app__btn" onClick = {handleClick}>Add</button>
          
        </form>
    );
}
export default TodoNew;