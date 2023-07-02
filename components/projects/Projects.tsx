import { motion } from "framer-motion";
import Link from "next/link";
import Project from "./Project";

const Projects = ({ articles }: any) => {
  return (
    <section id="projects" className="my-32 flex flex-col gap-5 px-5">
      <div className="w-full">
        <h2 className="variable-text bg-gradient-to-tr from-amber-300 to-teal-300 bg-clip-text text-3xl font-black uppercase text-transparent md:text-5xl ">
          Projects & Posts
        </h2>
      </div>
      <Link href="/articles">
        <h2 className="max-w-[100px] cursor-pointer font-abcWhyteVar text-2xl font-bold text-white underline decoration-neutral-700 decoration-[3px] underline-offset-8 transition duration-500 hover:decoration-teal-300">
          Articles
        </h2>
      </Link>
      <div className="grid grid-flow-row grid-cols-1 gap-5 md:grid-cols-2">
        {articles.map((item: any, i: number) => (
          <motion.div
            key={i}
            whileInView={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: 100 }}
            //animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Project {...item} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
