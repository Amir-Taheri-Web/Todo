import { InfinitySpin } from "react-loader-spinner";
import styles from "@/styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>
      <InfinitySpin
        visible={true}
        width="200"
        color="#4793af"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
