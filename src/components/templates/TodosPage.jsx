import { useEffect, useState } from "react";
import Loader from "../modules/Loader";
import toast from "react-hot-toast";
import api from "@/configs/axios";
import TodoCard from "../modules/TodoCard";
import styles from "@/styles/TodosPage.module.css";
import Link from "next/link";

const TodosPage = ({status}) => {
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

  const deleteHandler = async (id) => {
    try {
      const res = await api.delete(`api/todo/delete/${id}`);

      if (res.status === "success") {
        fetchTodos2();
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (isLoading) return <Loader />;

  if (status === "authenticated" && !todos.todo && !todos.inProgress && !todos.review && !todos.done)
    return (
      <div className={styles.addContainer}>
        <Link href="/add-todo" className={styles.addTodo}>
          Add Todo
        </Link>
      </div>
    );

  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.todo}>Todo</h3>
        <TodoCard
          todos={todos}
          status="todo"
          statusHandler={statusHandler}
          deleteHandler={deleteHandler}
          next="inProgress"
        />
      </div>

      <div>
        <h3 className={styles.inProgress}>In Progress</h3>
        <TodoCard
          todos={todos}
          status="inProgress"
          statusHandler={statusHandler}
          deleteHandler={deleteHandler}
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
          deleteHandler={deleteHandler}
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
          deleteHandler={deleteHandler}
          back="review"
        />
      </div>
    </div>
  );
};

export default TodosPage;
