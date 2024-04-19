import { useState } from "react";
import RadioButton from "../modules/RadioButton";
import api from "@/configs/axios";
import toast from "react-hot-toast";
import styles from "@/styles/AddTodoPage.module.css";
import { useRouter } from "next/router";

const AddTodoPage = ({ type, todo }) => {
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [status, setStatus] = useState(todo?.status || "todo");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { todoId } = router.query;

  const addHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/api/todos", {
        title,
        status,
        description,
      });

      setIsLoading(false);

      if (res.status === "success") {
        toast.success(res.message);

        setTitle("");
        setDescription("");
        setStatus("todo");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.patch(`/api/todo/edit/${todoId}`, {
        title,
        status,
        description,
      });

      setIsLoading(false);

      if (res.status === "success") {
        toast.success(res.message);

        router.push("/");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={type === "add" ? () => addHandler() : () => editHandler()}
      >
        <div className={styles.textInput}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.textInput}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.radio}>
          <RadioButton
            value="todo"
            status={status}
            setStatus={setStatus}
            title="Todo"
          />

          <RadioButton
            value="inProgress"
            status={status}
            setStatus={setStatus}
            title="In Progress"
          />

          <RadioButton
            value="review"
            status={status}
            setStatus={setStatus}
            title="Review"
          />

          <RadioButton
            value="done"
            status={status}
            setStatus={setStatus}
            title="Done"
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {type === "add" ? "Add" : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default AddTodoPage;
