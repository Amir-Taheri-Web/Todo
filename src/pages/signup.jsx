/* eslint-disable react-hooks/exhaustive-deps */
import SignUpPage from "@/components/templates/SignUpPage";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignUp = () => {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <SignUpPage />
    </>
  );
};

export default SignUp;
