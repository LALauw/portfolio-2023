import { ProjectItem } from "./ProjectItem";
import Image from "next/image";
import { TiArrowRightThick } from "react-icons/ti";
import Link from "next/link";

const Project = (props: ProjectItem) => {
  return (
    <Link href={`/article/${props.slug}`}>
      <div className="group flex max-h-[350px] w-full cursor-pointer flex-col gap-3 rounded-xl bg-accent-dark p-10 shadow transition duration-300 ease-in-out hover:-translate-y-1 md:min-h-[500px]">
        <h4 className="h-1/5 w-full font-abcWhyteVar font-bold uppercase text-zinc-400">
          {props.subtitle}
        </h4>
        <h3 className="font-abcWhyteVar text-2xl font-bold text-white">
          {props.smallTitle}
        </h3>

        <div className="relative flex max-h-[150px] w-full items-center justify-center rounded object-cover md:max-h-[400px] md:min-h-[300px]">
          <Image
            width={400}
            height={300}
            layout="intrinsic"
            objectFit="contain"
            src={props.coverImage.url}
          />
        </div>
        {/* <img className="" src={props.image} /> */}
        <div className="mt-2 flex items-end justify-end font-abcWhyteVar text-lg font-black text-white md:text-3xl">
          <TiArrowRightThick className="transition duration-500 group-hover:translate-x-3" />
        </div>

        {/* <p className="font-abcWhyteVar text-base">{props.subtitle}</p> */}
      </div>
    </Link>
  );
};

export default Project;
