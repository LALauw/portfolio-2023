import { motion } from "framer-motion";
import json from "./workex.json";
import { WorkItem } from "./WorkItem";
import Work from "./Work";

const Works = () => {
  const items: WorkItem[] = json;

  return (
    <section id="work" className="my-32 flex flex-col gap-5 px-5">
      <div className="w-full ">
        <h2 className="variable-text bg-gradient-to-tr from-amber-300 to-teal-300 bg-clip-text text-3xl font-black uppercase text-transparent md:text-5xl ">
          Experience
        </h2>
      </div>
      <div className="grid grid-flow-row grid-cols-1 gap-5 md:grid-cols-2">
        {items.map((item, i) => (
          <motion.div
            key={i}
            whileInView={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: 100 }}
            //animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Work {...item} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Works;
