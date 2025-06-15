import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import { useState } from "react";
import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";
import { Outlet } from "react-router-dom";
const App = () => {
    const [todoList, setTodoList] = useState([]);
    const addNewtodo = (name) => {
        const newTodo = { id: randomIntFromInterval(1, 10000000), name: name };
        setTodoList([...todoList, newTodo]);
    };
    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const del = (id) => {
        setTodoList(todoList.filter((item) => item.id !== id));
    };
    return (
        <>
            <Header />
            <div className="todo-app">
                <div className="todo-app__inner">
                    <h2 className="todo-app__title">To do list</h2>
                    <TodoNew addNewtodo={addNewtodo} />
                    {todoList.length > 0 ? (
                        <TodoData del={del} todoList={todoList} />
                    ) : (
                        <div className="todo-app__img-wrap">
                            <img src={reactLogo} alt="" className="logo" />
                        </div>
                    )}
                </div>
            </div>
            <Outlet />
            <Footer />
        </>
    );
};

export default App;
