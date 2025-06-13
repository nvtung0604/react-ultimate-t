const TodoData = (props) => {
    const { del, todoList } = props;
    
    return (
        <ul className="tasks-list">
            {todoList && todoList.map((item, index) => (
                <li className="task-item" key={index}>{item.name} <button onClick={() => {del(item.id)}}>Delete</button></li>
            ))}
            
        </ul>
    );
};

export default TodoData;
