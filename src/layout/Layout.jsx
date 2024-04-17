import Link from "next/link";
import { FaListCheck } from "react-icons/fa6";
import { MdAddCircle } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Link href="/">
          <h1>Todo App</h1>
        </Link>
      </header>

      <aside>
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

      <main>{children}</main>
    </>
  );
};

export default Layout;
