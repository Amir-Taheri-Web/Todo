/* eslint-disable react-hooks/exhaustive-deps */
import AddTodoPage from "@/components/templates/AddTodoPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AddTodo = () => {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin");
  }, [status]);

  return <AddTodoPage type="add" />;
};

export default AddTodo;
