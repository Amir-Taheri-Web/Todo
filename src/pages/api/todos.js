import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  await connectDB(res);

  const session = await getSession({ req });

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
};

export default handler;
