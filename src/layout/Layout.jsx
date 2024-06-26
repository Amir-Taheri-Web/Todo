import Link from "next/link";
import { FaListCheck } from "react-icons/fa6";
import { MdAddCircle } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import styles from "@/styles/Layout.module.css";
import { Toaster } from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useState } from "react";
import Menu from "@/components/modules/Menu";

const Layout = ({ children }) => {
  const { status } = useSession();

  const router = useRouter();

  const logoutHandler = async () => {
    signOut({ redirect: false });
    toast.success("Logged out");
    router.push("/signin");
  };

  return (
    <>
      <header className={styles.header}>
        <Menu />

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
