import { useSession } from "next-auth/react";
import Head from "next/head";
import { FooterSocial } from "../components/footer-social";
import { HeaderAuth } from "../components/header-auth";
import { HeaderBase } from "../components/header-base";
import { HeaderNoauth } from "../components/header-noauth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  const chosenHeader = () => {
    if (status === "loading") {
      return <HeaderBase> </HeaderBase>;
    } else if (status === "authenticated") {
      return <HeaderAuth imageUrl={session?.user?.image} />;
    } else {
      return <HeaderNoauth />;
    }
  };

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
      {chosenHeader()}
      {children}
      <FooterSocial />
    </>
  );
}
