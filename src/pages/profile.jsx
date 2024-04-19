/* eslint-disable react-hooks/exhaustive-deps */
import ProfilePage from "@/components/templates/ProfilePage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Profile = () => {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin");
  }, [status]);

  return <ProfilePage />;
};

export default Profile;
