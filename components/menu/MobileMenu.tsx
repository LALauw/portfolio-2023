import Link from "next/link";
import { ImCross } from "react-icons/im";

const MobileMenu = ({ handleToggle, props }: any) => {
  if (props) {
    return (
      <div className="fixed top-24 left-0 z-[70] flex min-h-screen min-w-[100vw] cursor-pointer flex-col gap-5 bg-[#111] bg-opacity-70 p-10 backdrop-blur">
        <div className="flex h-full w-full flex-col">
          <ul className="text-white-300 h-5/6 w-full text-xl uppercase">
            <Link href={""}>
              <li
                onClick={handleToggle}
                className="text-heading border-white-300/40 font-heading relative block w-full cursor-pointer items-center border-b-2 py-3 text-zinc-400 transition duration-300 hover:text-gray-200"
              >
                Home
              </li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
  return <></>;
};

export default MobileMenu;
