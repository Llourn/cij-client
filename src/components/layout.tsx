import Head from 'next/head';
import { FooterSocial } from './footer-social';
import { HeaderSimple } from './header-simple';

const landingPageLinks = [
  {
    link: '/login',
    label: 'Log In',
  },
  {
    link: '/signup',
    label: 'Sign Up',
  },
];

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Cyriously in or planning to be in Japan."
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta name="og:title" content="Cyriously In Japan" />
      </Head>
      {home ? (
        <>
          <HeaderSimple links={landingPageLinks} />
          {children}
          <FooterSocial />
        </>
      ) : (
        <>
          <p>nothing</p>
          {children}
        </>
      )}
    </div>
  );
}
