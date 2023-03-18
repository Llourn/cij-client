import { useSession } from "next-auth/react";
import Head from "next/head";
import { FooterSocial } from "../components/footer-social";
import { HeaderAuth } from "../components/header-auth";
import { HeaderNoauth } from "../components/header-noauth";

const landingPageLinks = [
  {
    link: "/login",
    label: "Log In",
  },
  {
    link: "/signup",
    label: "Sign Up",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Cyriously in or planning to be in Japan."
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta name="og:title" content="Cyriously In Japan" />
      </Head>
      {status === "authenticated" ? (
        <HeaderAuth links={landingPageLinks} />
      ) : (
        <HeaderNoauth links={landingPageLinks} />
      )}
      {children}
      <FooterSocial />
    </>
  );
}
