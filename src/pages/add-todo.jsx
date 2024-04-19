/* eslint-disable react-hooks/exhaustive-deps */
import AddTodoPage from "@/components/templates/AddTodoPage";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AddTodo = () => {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin");
  }, [status]);

  return (
    <>
      <Head>
        <title>Add Todo</title>
      </Head>
      <AddTodoPage type="add" />
    </>
  );
};

export default AddTodo;
