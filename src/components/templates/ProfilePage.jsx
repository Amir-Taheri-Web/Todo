import { useEffect, useState } from "react";
import api from "@/configs/axios";
import toast from "react-hot-toast";
import ProfileForm from "../modules/ProfileForm";
import ProfileInfo from "../modules/ProfileInfo";
import Loader from "../modules/Loader";

const ProfilePage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/profile");

      setEmail(res.data.email);
      setFirstName(res.data?.firstName);
      setLastName(res.data?.lastName);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <p>
        Email: <span>{email}</span>
      </p>
      {!firstName || !lastName ? (
        <ProfileForm
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
        />
      ) : (
        <ProfileInfo firstName={firstName} lastName={lastName} />
      )}
    </div>
  );
};

export default ProfilePage;
