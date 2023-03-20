import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Layout from "../layout/layout";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";

const notoSansJp = Noto_Sans_JP({
  subsets: [],
  weight: ["500"],
});

const notoSerifJp = Noto_Serif_JP({
  subsets: [],
  weight: ["500"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Cyriously In Japan</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <SessionProvider session={session}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            globalStyles: (theme) => ({
              // body: {
              //   minHeight: "100vh",
              // },
              "#__next": {
                minHeight: "100vh",
                position: "relative",
              },
              ".jp-sans": {
                fontFamily: notoSansJp.style.fontFamily,
              },
              ".jp-serif": {
                fontFamily: notoSerifJp.style.fontFamily,
              },
            }),
            /** Put your mantine theme override here */
            colorScheme: "light",
            colors: {
              mainRed: [
                "#ffe3e3",
                "#ffc9c9",
                "#ffa8a8",
                "#ff8787",
                "#ff6b6b",
                "#fa5252",
                "#f03e3e",
                "#e03131",
                "#c92a2a",
                "#B42525",
              ],
            },
            primaryColor: "mainRed",
            primaryShade: {
              light: 8,
              dark: 9,
            },
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </SessionProvider>
    </>
  );
}
