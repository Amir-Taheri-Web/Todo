/* eslint-disable react-hooks/exhaustive-deps */
import TodosPage from "@/components/templates/TodosPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin");
  }, [status]);

  return <TodosPage status={status} />;
};

export default Home;
