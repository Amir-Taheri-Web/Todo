const TodoCard = ({ todos, status }) => {
  return (
    <ul>
      {todos[status]?.map((todo) => (
        <li key={todo._id}>
          <h4>{todo.title}</h4>
          <p>{todo.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default TodoCard;
