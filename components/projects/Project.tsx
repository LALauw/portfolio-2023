import { ProjectItem } from "./ProjectItem";
import Image from "next/image";
import { TiArrowRightThick } from "react-icons/ti";

const Project = (props: ProjectItem) => {
  return (
    <div className="group flex min-h-[500px] w-full cursor-pointer flex-col gap-3 rounded-xl bg-accent-dark p-10 shadow transition duration-500 ease-in-out hover:-translate-y-1">
      <h4 className="h-1/5 w-full font-abcWhyteVar font-bold uppercase text-zinc-400">
        {props.subject}
      </h4>
      <h3 className="font-abcWhyteVar text-2xl font-bold text-white">
        {props.title}
      </h3>

      <div className="relative flex max-h-[400px] min-h-[300px] w-full items-center justify-center rounded object-cover">
        <Image
          width={400}
          height={300}
          layout="intrinsic"
          objectFit="contain"
          src={props.image}
        />
      </div>
      {/* <img className="" src={props.image} /> */}
      <div className="mt-2 flex items-end justify-end font-abcWhyteVar text-3xl font-black text-white">
        <TiArrowRightThick className="transition duration-500 group-hover:translate-x-3" />
      </div>

      {/* <p className="font-abcWhyteVar text-base">{props.subtitle}</p> */}
    </div>
  );
};

export default Project;
