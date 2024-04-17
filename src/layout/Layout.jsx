import Link from "next/link";
import { FaListCheck } from "react-icons/fa6";
import { MdAddCircle } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import styles from "@/styles/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <h1>Todo App</h1>
        </Link>
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
