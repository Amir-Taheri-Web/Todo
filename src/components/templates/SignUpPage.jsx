import api from "@/configs/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "@/styles/SignUpPage.module.css";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const signUpHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/api/auth/signup", { email, password });
      setIsLoading(false);

      if (res.status === "success") {
        toast.success(res.message);
        router.push("/signin");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
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

        <button type="submit" disabled={isLoading}>Register</button>
      </form>

      <p>
        Have an account? <Link href="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
