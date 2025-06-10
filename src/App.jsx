import './components/todo/todo.css';
import TodoData from './components/todo/TodoData';
import TodoNew from './components/todo/TodoNew';
import reactLogo from './assets/react.svg';
import { useState } from 'react';

const App = () => {
  const [todoList, setTodoList] = useState([
    {id: 1, name: "Learning React"}, 
    {
      id: 2, name: "Watching Youtube"
    }
  ])

  const name = "Tung";
  const age = 25;
  const data = {
    address: "haiduong",
    country: "vietnam"
  };
  const addNewtodo = (name) => {
    const newTodo = {id: randomIntFromInterval(1, 10000000), name: name}
    setTodoList([...todoList, newTodo])
  };
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return (
    <div className="todo-app">
      <div className="todo-app__inner">
        <h2 className="todo-app__title">
          To do list
        </h2>
        <TodoNew
          addNewtodo = {addNewtodo}
        />
       
        <TodoData
          name = {name}
          age = {age}
          data = {data}
          todoList = {todoList}
          
        />

        <div className="todo-app__img-wrap">
          {/* use JSX */}
          <img src={reactLogo} alt="" className="logo" />
        </div>
      </div>
    </div>
  );
}

export default App
