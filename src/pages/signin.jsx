/* eslint-disable react-hooks/exhaustive-deps */
import SignInPage from "@/components/templates/SignInPage";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignIn = () => {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <SignInPage />
    </>
  );
};

export default SignIn;
