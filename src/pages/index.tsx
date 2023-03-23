import Head from "next/head";
import Landing from "../modules/landing";

export default function Home() {
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
      <Landing />
    </>
  );
}
