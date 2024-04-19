import Link from "next/link";
import { slide as BurgerMenu } from "react-burger-menu";
import { FaListCheck } from "react-icons/fa6";
import { MdAddCircle } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import styles from "@/styles/Menu.module.css";

const Menu = () => {
  return (
    <div className={styles.wrapper}>
      <BurgerMenu width={"300px"}>
        <div className={styles.container}>
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
        </div>
      </BurgerMenu>
    </div>
  );
};

export default Menu;
