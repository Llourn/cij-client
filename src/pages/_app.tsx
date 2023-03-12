import '@/src/styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
          colors: {
            mainRed: [
              '#ffe3e3',
              '#ffc9c9',
              '#ffa8a8',
              '#ff8787',
              '#ff6b6b',
              '#fa5252',
              '#f03e3e',
              '#e03131',
              '#c92a2a',
              '#B42525',
            ],
          },
          primaryColor: 'mainRed',
          primaryShade: {
            light: 8,
            dark: 9,
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
