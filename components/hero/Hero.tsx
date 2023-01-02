import Image from "next/image";
import { RiGithubLine, RiTwitterLine, RiLinkedinLine } from "react-icons/ri";

const Hero = () => {
  return (
    <section className="flex px-5">
      <div className="relative flex w-full flex-col justify-between gap-5 text-center font-abcWhyte md:flex-row md:text-left">
        <div className="flex w-full flex-col gap-3 md:w-1/2">
          <h2 className="variable-text bg-gradient-to-tr from-amber-300 to-teal-300 bg-clip-text text-5xl font-black uppercase text-transparent ">
            Hi. I&apos;m Leslie. <br />A Software engineer.
          </h2>

          <p className="text-lg font-medium text-white">
            I&apos;m a passionate software engineer that loves to tackle a
            challenge. Currently contributing to KOIOS DAO, by completely
            overhauling their current application architecture using modern
            technologies like, Next.js, Graphql, and TailwindCSS.
          </p>
          <div className="mt-5">
            <ul className="flex justify-center gap-5 text-4xl md:justify-start">
              <a
                href="https://github.com/lalauw"
                rel="noreferrer noopener"
                target="_blank"
              >
                <li className="group rounded-lg bg-accent-dark p-2 text-neutral-400 transition duration-500 ease-in-out hover:scale-95 hover:text-teal-300 ">
                  <RiGithubLine />
                </li>
              </a>
              <a
                href="https://www.linkedin.com/in/leslielauw/"
                rel="noreferrer noopener"
                target="_blank"
              >
                <li className="group rounded-lg bg-accent-dark p-2 text-neutral-400 transition duration-500 ease-in-out hover:scale-95 hover:text-teal-300 ">
                  <RiLinkedinLine />
                </li>
              </a>
              <a
                href="https://twitter.com/PauwCrypto"
                rel="noreferrer noopener"
                target="_blank"
              >
                <li className="group rounded-lg bg-accent-dark p-2 text-neutral-400 transition duration-500 ease-in-out hover:scale-95 hover:text-teal-300 ">
                  <RiTwitterLine />
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div className="relative hidden h-full w-1/2  justify-end md:flex">
          <div className="relative h-96 w-96 overflow-hidden rounded-lg bg-gradient-to-b from-amber-300 to-teal-300 md:flex">
            <Image layout="fill" objectFit="cover" src="/me2.png" />
          </div>
        </div>

        <div className="relative mx-auto flex h-80 w-80 overflow-hidden rounded-full bg-gradient-to-b from-amber-300 to-teal-300 md:hidden">
          <Image layout="fill" objectFit="cover" src="/me2.png" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
