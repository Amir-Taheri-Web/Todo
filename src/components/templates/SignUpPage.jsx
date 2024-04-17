import api from "@/configs/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const signUpHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await api.post("/api/auth/signup", { email, password });
      console.log(res);

      if (res.status === "success") {
        toast.success(res.message);
        router.push("/signin");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2>Create Account</h2>

      <form onSubmit={signUpHandler}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>

      <p>
        Have an account? <Link href="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
