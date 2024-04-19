import AddTodoPage from "@/components/templates/AddTodoPage";
import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const EditTodo = ({ todo }) => {
  return <AddTodoPage type="edit" todo={todo} />;
};

const getServerSideProps = async ({ req, res, query }) => {
  const { todoId } = query;

  await connectDB();

  const session = await getServerSession(req, res, authOptions);

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
