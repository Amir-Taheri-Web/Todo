import styles from "@/styles/TodoCard.module.css";

const TodoCard = ({ todos, status, back, next, statusHandler }) => {
  return (
    <ul className={styles.list}>
      {todos[status]?.map((todo) => (
        <li key={todo._id}>
          <h4>{todo.title}</h4>
          <span className={styles[status]}></span>
          <p>{todo.description}</p>
          <div>
            {back && (
              <button
                type="button"
                onClick={() => statusHandler(back, todo._id)}
              >
                Back
              </button>
            )}
            {next && (
              <button
                type="button"
                onClick={() => statusHandler(next, todo._id)}
              >
                Next
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoCard;
