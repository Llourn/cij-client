import Head from "next/head";
import Landing from "../modules/landing";
import Layout from "../layout/layout";
import { useSession } from "next-auth/react";
import Dashboard from "./dashboard";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Cyriously in Japan</title>
        <meta
          name="description"
          content="Cyriously in or planning to be in Japan."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{status === "authenticated" ? <Dashboard /> : <Landing />}</main>
    </>
    //   <Layout auth={status === "authenticated"}>
    // </Layout>
  );
}
