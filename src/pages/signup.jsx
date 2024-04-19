/* eslint-disable react-hooks/exhaustive-deps */
import SignUpPage from "@/components/templates/SignUpPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignUp = () => {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);

  return <SignUpPage />;
};

export default SignUp;
