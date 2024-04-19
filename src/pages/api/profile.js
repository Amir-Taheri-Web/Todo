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
    return res.status(404).json({
      code: 404,
      status: "failure",
      message: "You are unauthorized. Login again",
    });

  if (req.method === "POST") {
    const { firstName, lastName } = req.body;

    if (!firstName.trim() || !lastName.trim()) {
      return res.status(422).json({
        code: 422,
        status: "failure",
        message: "Please fill all the fields",
      });
    }

    try {
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();

      return res
        .status(201)
        .json({ code: 201, status: "success", message: "Profile updated" });
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
      return res.status(200).json({
        code: 200,
        status: "success",
        data: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
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
