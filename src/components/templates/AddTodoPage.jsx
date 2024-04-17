import { useState } from "react";
import RadioButton from "../modules/RadioButton";
import api from "@/configs/axios";
import toast from "react-hot-toast";

const AddTodoPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div>
      <form onSubmit={addHandler}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
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

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTodoPage;
