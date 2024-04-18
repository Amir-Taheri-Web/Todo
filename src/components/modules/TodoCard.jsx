import styles from "@/styles/TodoCard.module.css";

const TodoCard = ({ todos, status }) => {
  return (
    <ul className={styles.list}>
      {todos[status]?.map((todo) => (
        <li key={todo._id}>
          <h4>{todo.title}</h4>
          <span className={styles[status]}></span>
          <p>{todo.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default TodoCard;
