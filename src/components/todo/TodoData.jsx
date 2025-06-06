const TodoData = (props) => {
  // props is object variable
  // object destructing
  const {name, age, data} = props;
    return (
        // Tasks
        <ul className="tasks-list">
          <li className="task__item">My name {name}</li>
          <li className="task-item">Learn react in one hours</li>
        </ul>
    );
}

export default TodoData;