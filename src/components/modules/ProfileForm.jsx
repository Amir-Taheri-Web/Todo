import api from "@/configs/axios";
import toast from "react-hot-toast";
import styles from "@/styles/ProfileForm.module.css";

const ProfileForm = ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  setIsEdit,
  password,
  setPassword,
}) => {
  const updateHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await api.patch("/api/profile", {
        firstName,
        lastName,
        password,
      });
      if (res.status === "success") {
        toast.success(res.message);
        setPassword("");
        setIsEdit(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.form}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="button" onClick={updateHandler}>Update Profile</button>
    </div>
  );
};

export default ProfileForm;
