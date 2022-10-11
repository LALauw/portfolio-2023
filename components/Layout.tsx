import Head from "next/head";
import Navbar from "./menu/Navbar";

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Leslie Lauw Portfolio</title>
        <meta name="description" content="Personal Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex max-w-[1600px] flex-col gap-10">
        <section className="mx-auto flex min-h-[10vh] w-full flex-col items-center justify-center px-10 transition duration-300">
          <Navbar />
        </section>
        {children}
      </main>
    </>
  );
}
