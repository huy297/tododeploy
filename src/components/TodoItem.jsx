import propTypes from "prop-types";

const TodoItem = (props) => {
  console.log(props);
  return (
    <div
      className="todo-item"
      onClick={() => props.handleTodoItemClick(props.id)}
    >
      <div style={{ display: "flex", gap: 4 }}>
        <input
          type="checkbox"
          checked={props.isCompleted}
          onChange={() => {
            props.handleCompleteCheckBox(props.id);
          }}
          onClick={(e)=>e.stopPropagation()}
        />
        <p className="todo-item-text">{props.name}</p>
      </div>
      {props.isImportant && <p>⭐</p>}
    </div>
  );
};

TodoItem.propTypes = {
  id: propTypes.string,
  name: propTypes.string,
  isImportant: propTypes.bool,
  isCompleted: propTypes.bool,
  handleCompleteCheckBox: propTypes.func,
  handleTodoItemClick: propTypes.func,
};


export default TodoItem;
