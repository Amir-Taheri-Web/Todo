import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import sortTodos from "@/utils/sortTodos";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";


const handler = async (req, res) => {
  await connectDB(res);

  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res
      .status(401)
      .json({ code: 401, status: "failure", message: "You are not logged in" });

  const user = await User.findOne({ email: session.user.email });

  if (!user)
    return res.status(401).json({
      code: 401,
      status: "failure",
      message: "You are unauthorized. Login again",
    });

  if (req.method === "POST") {
    const { title, description, status } = req.body;

    if (!title.trim() || !description.trim() || !status.trim())
      return res.status(422).json({
        code: 422,
        status: "failure",
        message: "Please fill all the fields",
      });

    try {
      await user.todos.push({ title, description, status });
      await user.save();

      return res
        .status(200)
        .json({ code: 200, status: "success", message: "Todo added!" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        code: 500,
        status: "failure",
        message: "Connection to server failed",
      });
    }
  }

  if (req.method === "GET") {
    try {
      const todos = sortTodos(user.todos);

      return res
        .status(200)
        .json({ code: 200, status: "success", data: todos });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        code: 500,
        status: "failure",
        message: "Connection to server failed",
      });
    }
  }

  if (req.method === "PATCH") {
    const { status, id } = req.body;

    if (!status || !id)
      return res.status(422).json({
        code: 422,
        status: "failure",
        message: "Something went wrong. Try again",
      });

    try {
      await User.findOneAndUpdate(
        { "todos._id": id },
        { $set: { "todos.$.status": status } }
      );

      return res
        .status(200)
        .json({ code: 200, status: "success", message: "Updated!" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        code: 500,
        status: "failure",
        message: "Connection to server failed. Try again",
      });
    }
  }
};

export default handler;
