import { ProjectItem } from "./ProjectItem";
import Image from "next/image";
import { TiArrowRightThick } from "react-icons/ti";

const Project = (props: ProjectItem) => {
  return (
    <div className="group flex min-h-[500px] w-full cursor-pointer flex-col gap-3 rounded-xl bg-accent-dark p-10 transition duration-500 ease-in-out hover:-translate-y-1">
      <h4 className="h-1/5 w-full font-abcWhyteVar font-bold uppercase text-zinc-400">
        {props.subject}
      </h4>

      <div className="flex w-2/5 flex-col gap-3">
        <h3 className="font-abcWhyteVar text-2xl font-bold">{props.title}</h3>
      </div>

      <img className="max-h-[400px] rounded object-cover" src={props.image} />
      <div className="mt-2 flex items-end justify-end font-abcWhyteVar text-3xl font-black">
        <TiArrowRightThick className="transition duration-500 group-hover:translate-x-3" />
      </div>
    </div>
  );
};

export default Project;
