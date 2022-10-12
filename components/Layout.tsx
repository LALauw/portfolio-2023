import Head from "next/head";
import Navbar from "./menu/Navbar";
import { useEffect } from "react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

export default function Layout({ children }: any) {
  useEffect(() => {
    hljs.highlightAll();
  }, [{ children }]);

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
