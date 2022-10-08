import { WorkItem } from "./WorkItem";
import Image from "next/image";

const Work = (props: WorkItem) => {
  return (
    <div className="group flex min-h-[200px] w-full gap-3 rounded-xl bg-accent-dark p-10 shadow transition duration-500 ease-in-out hover:-translate-y-1">
      <div className="flex w-full flex-col justify-between md:w-3/4">
        <div className="flex flex-col gap-3">
          <h4 className="h-1/5 w-full font-abcWhyteVar font-bold uppercase text-zinc-400">
            {props.title}
          </h4>
          <h3 className="font-abcWhyteVar text-2xl font-bold text-white">
            {props.title}
          </h3>
        </div>

        <h5 className="mt-3 font-abcWhyteVar text-base font-bold uppercase text-zinc-400 opacity-75">
          {props.time}
        </h5>
      </div>

      <div className="relative hidden max-h-[100px] min-h-[100px] w-1/4 items-center justify-center rounded object-cover md:flex">
        <Image
          width={100}
          height={100}
          className="rounded-lg"
          layout="intrinsic"
          objectFit="contain"
          src={props.logo}
        />
      </div>
    </div>
  );
};

export default Work;
