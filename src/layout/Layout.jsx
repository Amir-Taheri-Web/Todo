import Link from "next/link";
import { FaListCheck } from "react-icons/fa6";
import { MdAddCircle } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import styles from "@/styles/Layout.module.css";
import { Toaster } from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";

const Layout = ({ children }) => {
  const { status } = useSession();

  const logoutHandler = async () => {
    signOut();
  };

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <h1>Todo App</h1>
        </Link>

        {status === "authenticated" && (
          <button type="button" onClick={logoutHandler}>
            Logout
          </button>
        )}
        {status === "unauthenticated" && (
          <button type="button">
            <Link href="/signin">Login</Link>
          </button>
        )}

        <Toaster />
      </header>

      <div className={styles.container}>
        <aside className={styles.aside}>
          <p>Welcome 👋</p>

          <ul>
            <li>
              <Link href="/">
                <FaListCheck />
                Todos
              </Link>
            </li>

            <li>
              <Link href="/add-todo">
                <MdAddCircle />
                Add Todo
              </Link>
            </li>

            <li>
              <Link href="/profile">
                <FaUser />
                Profile
              </Link>
            </li>
          </ul>
        </aside>

        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
