const TodoNew = (props) => {
  const handleClick = () => {
    alert("click me")
  }
  // event meaning?
  const handleOnChange = (event) => {
    alert("handle on change", event.target.value)
  }
  
    return (
        <form action="" className="todo-app__form">
          <input type="text" name="" id="" className="todo-app__input" placeholder='Enter your task' onChange={handleOnChange}/>
          <button className="todo-app__btn" onClick = {handleClick}>Add</button>
        </form>
    );
}
export default TodoNew;