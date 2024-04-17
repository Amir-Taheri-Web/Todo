import User from "@/models/user";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { validateEmail, validatePassword } from "@/utils/validate";

const handler = async (req, res) => {
  if (req.method !== "POST") return;

  await connectDB(res);

  const { email, password } = req.body;

  if (!email.trim() || !password.trim())
    return res.status(422).json({
      code: 422,
      status: "failure",
      message: "Please fill all the fields",
    });

  if (!validateEmail(email))
    return res.status(422).json({
      code: 422,
      status: "failure",
      message: "Email address is invalid",
    });

  if (!validatePassword(password))
    return res.status(422).json({
      code: 422,
      status: "failure",
      message:
        "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character(~`! @#$%^&*()-_+={}[]|;:<>,./?)",
    });

  const existingUser = await User.findOne({ email: email });

  if (existingUser)
    return res
      .status(422)
      .json({ code: 422, status: "failure", message: "User already exists" });

  const hashedPassword = await hashPassword(password);

  try {
    await User.create({ email, password: hashedPassword });

    return res.status(201).json({
      code: 201,
      status: "success",
      message: "User created!",
      data: { email },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      code: 500,
      status: "failure",
      message: "Connection to server failed",
    });
  }
};

export default handler;
