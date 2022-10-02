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
      <main>
        <section className="container mx-auto px-4 transition duration-300 flex flex-col items-center justify-center">
          <Navbar />
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
