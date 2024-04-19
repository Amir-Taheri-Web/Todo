import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/404.module.css"

const NotFound = () => {
  return (
    <div className={styles.container}>
      <Image src="/images/404.png" width={500} height={400} alt="404 image" />
      <Link href="/">Main Page</Link>
    </div>
  );
};

export default NotFound;
