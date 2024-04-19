/* eslint-disable react-hooks/exhaustive-deps */
import ProfilePage from "@/components/templates/ProfilePage";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Profile = () => {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin");
  }, [status]);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <ProfilePage />
    </>
  );
};

export default Profile;
