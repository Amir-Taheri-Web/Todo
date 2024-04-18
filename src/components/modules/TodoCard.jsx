import styles from "@/styles/TodoCard.module.css";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";

const TodoCard = ({
  todos,
  status,
  back,
  next,
  statusHandler,
  deleteHandler,
}) => {
  return (
    <ul className={styles.list}>
      {todos[status]?.map((todo) => (
        <li key={todo._id}>
          <h4>{todo.title}</h4>
          <span className={styles[status]}></span>
          <p>{todo.description}</p>
          <div id={styles[status]}>
            {back && (
              <button
                type="button"
                onClick={() => statusHandler(back, todo._id)}
              >
                <IoCaretBack />
                Back
              </button>
            )}
            {next && (
              <button
                type="button"
                onClick={() => statusHandler(next, todo._id)}
              >
                Next
                <IoCaretForward />
              </button>
            )}

            <button type="button" onClick={() => deleteHandler(todo._id)}>
              <FaTrashCan />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoCard;
