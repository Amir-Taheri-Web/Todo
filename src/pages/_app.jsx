import Layout from "@/layout/Layout";
import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className={montserrat.className}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </div>
  );
}
