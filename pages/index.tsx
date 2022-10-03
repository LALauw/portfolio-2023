import Navbar from "@/components/menu/Navbar";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.scss";
//import { Home as Test } from "react-iconly";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Leslie Lauw Portfolio</title>
        <meta name="description" content="Personal Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col px-5 md:px-40">
        <section className="container mx-auto flex min-h-[10vh] flex-col items-center justify-center px-10 transition duration-300">
          <Navbar />
          <div className="h-[30vh]"></div>
        </section>
        <section className="container">
          <div className="items-left flex w-full flex-col justify-between gap-5 text-center font-abcWhyte md:flex-row md:text-left">
            <div className="flex w-full flex-col gap-3 md:w-1/2">
              <h2 className="variable-text bg-gradient-to-tr from-indigo-800 to-rose-700 bg-clip-text text-5xl font-black uppercase text-transparent dark:from-amber-300 dark:to-teal-300 ">
                Hi. I'm Leslie. <br />A Software engineer.
              </h2>
              <h3 className="gradient-text text-3xl font-bold uppercase"></h3>
              <p className="text-lg font-medium">
                Software Engineer currently graduating at The Hague University
                of Applied Sciences with a passion for web3 technologies.
              </p>
            </div>
            <div className=" relative hidden h-96 w-64 overflow-hidden rounded-full bg-gradient-to-b from-indigo-800 to-rose-700 dark:from-amber-300 dark:to-teal-300 md:flex">
              <Image layout="fill" objectFit="cover" src="/me2.png" />
            </div>
            <div className="relative mx-auto flex h-80 w-80 overflow-hidden rounded-full bg-gradient-to-b from-indigo-800 to-rose-700 dark:from-amber-300 dark:to-teal-300 md:hidden">
              <Image layout="fill" objectFit="cover" src="/me2.png" />
            </div>
          </div>
        </section>
      </main>
      {/* 

      <div className="h-screen w-full"></div>
      <div className="h-screen w-full"></div>
      <div className="h-screen w-full"></div> */}
    </div>
  );
};

export default Home;
