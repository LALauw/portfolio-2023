import Navbar from "@/components/menu/Navbar";
import Projects from "@/components/projects/Projects";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
//import { Home as Test } from "react-iconly";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Leslie Lauw Portfolio</title>
        <meta name="description" content="Personal Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex max-w-[1600px] flex-col gap-10">
        <section className="mx-auto flex min-h-[10vh] w-full flex-col items-center justify-center px-10 transition duration-300">
          <Navbar />
          <div className="h-[30vh]"></div>
        </section>
        <section className="flex px-5">
          <div className="relative flex w-full flex-col justify-between gap-5 text-center font-abcWhyte md:flex-row md:text-left">
            <div className="flex w-full flex-col gap-3 md:w-1/2">
              <h2 className="variable-text bg-gradient-to-tr from-indigo-800 to-rose-700 bg-clip-text text-5xl font-black uppercase text-transparent dark:from-amber-300 dark:to-teal-300 ">
                Hi. I'm Leslie. <br />A Software engineer.
              </h2>

              <p className="text-lg font-medium">
                I'm currently graduating at The Hague University of Applied
                Sciences with a passion for web3 technologies.
              </p>
              <div className="flex justify-between ">
                <ul className="flex justify-center gap-5 text-5xl md:justify-start">
                  <li className="transition duration-300 ease-in-out hover:scale-95 hover:text-gray-300">
                    <a
                      href="https://google.com"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      <AiFillLinkedin />
                    </a>
                  </li>
                  <li className="transition duration-300 ease-in-out hover:scale-95 hover:text-gray-300 ">
                    <a
                      href="https://google.com"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      <AiFillGithub />
                    </a>
                  </li>
                </ul>
                <div>
                  <a
                    href="https://google.com"
                    rel="noreferrer noopener"
                    target="_blank"
                  ></a>
                  <button className="variable-text dark:zinc-500 mx-2 rounded-lg bg-zinc-300 px-3 py-2 uppercase text-zinc-900 transition duration-300">
                    Resume
                  </button>
                </div>
              </div>
            </div>
            <div className="relative hidden h-full w-1/2  justify-end md:flex">
              <div className="relative h-96 w-64 overflow-hidden rounded-lg bg-gradient-to-b from-indigo-800 to-rose-700  dark:from-amber-300 dark:to-teal-300 md:flex">
                <Image layout="fill" objectFit="cover" src="/me2.png" />
              </div>
            </div>

            <div className="relative mx-auto flex h-80 w-80 overflow-hidden rounded-full bg-gradient-to-b from-indigo-800 to-rose-700 dark:from-amber-300 dark:to-teal-300 md:hidden">
              <Image layout="fill" objectFit="cover" src="/me2.png" />
            </div>
          </div>
        </section>
        <Projects />
      </main>
      {/* 

      <div className="h-screen w-full"></div>
      <div className="h-screen w-full"></div>
      <div className="h-screen w-full"></div> */}
    </div>
  );
};

export default Home;
