import AddTodoPage from "@/components/templates/AddTodoPage";
import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

const EditTodo = ({ todo }) => {
  return <AddTodoPage type="edit" todo={todo} />;
};

const getServerSideProps = async ({ req, query }) => {
  const { todoId } = query;

  await connectDB();

  const session = await getSession({ req });

  if (!session)
    return {
      redirect: { destination: "/signin", permanent: false },
    };

  const user = await User.findOne({ email: session.user.email });
  const todo = user.todos.find((todo) => todo._id.toString() === todoId);

  return {
    props: { todo: JSON.parse(JSON.stringify(todo)) },
  };
};

export default EditTodo;
export { getServerSideProps };
