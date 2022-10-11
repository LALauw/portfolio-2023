import { motion } from "framer-motion";
import TechItem from "./TechItem";
import { frameworks, languages, tooling } from "./Technologies";

const Tech = () => {
  return (
    <section id="tech" className="my-32 flex flex-col gap-5 px-5">
      <div className="w-full">
        <h2 className="variable-text bg-gradient-to-tr from-amber-300 to-teal-300 bg-clip-text text-3xl font-black uppercase text-transparent md:text-5xl ">
          Tech n&apos; Tooling
        </h2>
      </div>
      <div className="mt-10 w-full">
        <p className="font-abcWhyte text-lg font-black uppercase text-white md:text-2xl ">
          Frameworks
        </p>
      </div>
      <div className="flex flex-wrap gap-5">
        {frameworks.map((item: TechItem, i: number) => (
          <motion.div
            key={i}
            whileInView={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: 100 }}
            transition={{ duration: i * 0.15, ease: "easeInOut" }}
          >
            <a href={item.url} rel="noreferrer noopener" target="_blank">
              <div className="flex h-24 w-24 flex-col items-center justify-evenly rounded-lg bg-accent-dark p-5 text-2xl text-white transition duration-300 hover:-translate-y-3 md:h-36 md:w-36 md:text-4xl">
                <item.library></item.library>
                <h1 className=" bg-gradient-to-tr from-amber-300 to-teal-300 bg-clip-text font-abcWhyte text-xs font-semibold uppercase text-transparent md:text-base">
                  {item.name}
                </h1>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 w-full">
        <p className="font-abcWhyte text-2xl font-black uppercase text-white ">
          Languages
        </p>
      </div>
      <div className="flex flex-wrap gap-5">
        {languages.map((item: TechItem, i: number) => (
          <motion.div
            key={i}
            whileInView={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: 100 }}
            transition={{ duration: i * 0.15, ease: "easeInOut" }}
          >
            <a href={item.url} rel="noreferrer noopener" target="_blank">
              <div className="flex h-24 w-24 flex-col items-center justify-evenly rounded-lg bg-accent-dark p-5 text-2xl text-white transition duration-300 hover:-translate-y-3 md:h-36 md:w-36 md:text-4xl">
                <item.library></item.library>
                <h1 className=" bg-gradient-to-tr from-amber-300 to-teal-300 bg-clip-text font-abcWhyte text-xs font-semibold uppercase text-transparent md:text-base">
                  {item.name}
                </h1>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 w-full">
        <p className="font-abcWhyte text-2xl font-black uppercase text-white ">
          Tooling
        </p>
      </div>
      <div className="flex flex-wrap gap-5">
        {tooling.map((item: TechItem, i: number) => (
          <motion.div
            key={i}
            whileInView={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: 100 }}
            transition={{ duration: i * 0.15, ease: "easeInOut" }}
          >
            <a href={item.url} rel="noreferrer noopener" target="_blank">
              <div className="flex h-24 w-24 flex-col items-center justify-evenly rounded-lg bg-accent-dark p-5 text-2xl text-white transition duration-300 hover:-translate-y-3 md:h-36 md:w-36 md:text-4xl">
                <item.library></item.library>
                <h1 className=" bg-gradient-to-tr from-amber-300 to-teal-300 bg-clip-text font-abcWhyte text-xs font-semibold uppercase text-transparent md:text-base">
                  {item.name}
                </h1>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Tech;
