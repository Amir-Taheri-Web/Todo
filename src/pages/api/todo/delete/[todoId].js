import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

const handler = async (req, res) => {
  if (req.method !== "DELETE") return;

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

  const { todoId } = req.query;

  try {
    await User.updateOne(
      { _id: user._id },
      { $pull: { todos: { _id: todoId } } }
    );

    return res
      .status(200)
      .json({ code: 200, status: "success", message: "Todo deleted!" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      code: 500,
      status: "failure",
      message: "Connection to server failed. Try again",
    });
  }
};

export default handler;
