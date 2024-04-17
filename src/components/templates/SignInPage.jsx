import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "@/styles/SignInPage.module.css";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const signInHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setIsLoading(false);

      if (!res.error) {
        toast.success("Logged in!");
        router.push("/");
      } else {
        setIsLoading(false);
        toast.error(res.error);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>

      <form onSubmit={signInHandler}>
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

        <button type="submit" disabled={isLoading}>
          Login
        </button>
      </form>

      <p>
        Do not have an account? <Link href="/signup">Create Account</Link>
      </p>
    </div>
  );
};

export default SignInPage;
