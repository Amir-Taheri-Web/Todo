import Layout from "@/layout/Layout";
import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className={montserrat.className}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Head>
            <title>Todo App</title>
            <meta
              name="description"
              content="Todo App. Create and edit todos with different stages"
            />
            <meta
              name="keywords"
              content="todo, signin, signup, login, signout, next.js, react.js, add todo, add"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </div>
  );
}
