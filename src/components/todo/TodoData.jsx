const TodoData = (props) => {
    const { todoList } = props;

    return (
        <ul className="tasks-list">
            {todoList && todoList.map((item, index) => (
                <li className="task-item" key={index}>{item.name} <button>Delete</button></li>
            ))}
            
        </ul>
    );
};

export default TodoData;
