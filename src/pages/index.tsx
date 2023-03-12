import Head from "next/head";
import Landing from "../modules/Landing";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Cyriously in Japan</title>
        <meta
          name="description"
          content="Cyriously in or planning to be in Japan."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Landing />
      </main>
    </Layout>
  );
}