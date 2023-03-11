import Head from "next/head";
import Layout from "@/src/components/layout";
import { HeroImageRight } from "@/src/components/hero";

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
        <HeroImageRight />
      </main>
    </Layout>
  );
}
