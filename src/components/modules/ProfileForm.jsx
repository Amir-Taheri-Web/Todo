import api from "@/configs/axios";
import toast from "react-hot-toast";

const ProfileForm = ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  setIsEdit,
}) => {
  const updateHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await api.patch("/api/profile", { firstName, lastName });
      if (res.status === "success") {
        toast.success(res.message);
        setIsEdit(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={updateHandler}>
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

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
