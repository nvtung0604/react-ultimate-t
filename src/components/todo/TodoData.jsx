const TodoData = (props) => {
  // props is object variable
  // object destructing
  const {name, age, data} = props;
  // c2: for beginner -> const name = props.name
  // c3: lấy trực tiếp -> TodoData = ({name}) => {}
    return (
        // Tasks
        <ul className="tasks-list">
          <li className="task__item">My name {name}</li>
          <li className="task-item">Learn react in one hours</li>
          <li>
            {JSON.stringify(props.todoList)}
          </li>
        </ul>
    );
}

export default TodoData;