import { motion } from "framer-motion";
import Project from "./Project";
import { ProjectItem } from "./ProjectItem";
import json from "./Projects.json";

const Projects = () => {
  const items: ProjectItem[] = json;

  return (
    <section className="my-32 flex flex-col gap-5 px-5">
      <div className="w-full ">
        <h2 className="variable-text bg-gradient-to-tr from-indigo-800 to-rose-700 bg-clip-text text-5xl font-black uppercase text-transparent dark:from-amber-300 dark:to-teal-300 ">
          Projects
        </h2>
      </div>
      <div className="grid grid-flow-row grid-cols-1 gap-5 md:grid-cols-2">
        {items.map((item, i) => (
          <motion.div
            key={i}
            whileInView={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: 100 }}
            //animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
          >
            <Project {...item} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
