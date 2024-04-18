import { useEffect, useState } from "react";
import Loader from "../modules/Loader";
import toast from "react-hot-toast";
import api from "@/configs/axios";
import TodoCard from "../modules/TodoCard";
import styles from "@/styles/TodosPage.module.css";

const TodosPage = () => {
  const [todos, setTodos] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/api/todos");

      if (res.status === "success") {
        setTodos(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const fetchTodos2 = async () => {
    try {
      const res = await api.get("/api/todos");

      if (res.status === "success") setTodos(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (status, id) => {
    try {
      const res = await api.patch("api/todos", { status, id });

      if (res.status === "success") fetchTodos2();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.todo}>Todo</h3>
        <TodoCard
          todos={todos}
          status="todo"
          statusHandler={statusHandler}
          next="inProgress"
        />
      </div>

      <div>
        <h3 className={styles.inProgress}>In Progress</h3>
        <TodoCard
          todos={todos}
          status="inProgress"
          statusHandler={statusHandler}
          back="todo"
          next="review"
        />
      </div>

      <div>
        <h3 className={styles.review}>Review</h3>
        <TodoCard
          todos={todos}
          status="review"
          statusHandler={statusHandler}
          back="inProgress"
          next="done"
        />
      </div>

      <div>
        <h3 className={styles.done}>Done</h3>
        <TodoCard
          todos={todos}
          status="done"
          statusHandler={statusHandler}
          back="review"
        />
      </div>
    </div>
  );
};

export default TodosPage;
