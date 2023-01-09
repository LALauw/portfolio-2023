import Link from "next/link";
import { ImCross } from "react-icons/im";
import { AnimatePresence, motion } from "framer-motion";

const MobileMenu = ({ handleToggle, props }: any) => {
  if (props) {
    return (
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        exit={{ opacity: 0, translateY: 100 }}
        className="fixed top-24 left-0 z-[70] flex min-h-screen min-w-[100vw] cursor-pointer flex-col gap-5 bg-[#111] bg-opacity-70 p-10 backdrop-blur"
      >
        <AnimatePresence>
          <div className="flex h-full w-full flex-col">
            <ul className="text-white-300 h-5/6 w-full text-xl uppercase">
              <Link href="/">
                <li
                  onClick={handleToggle}
                  className="border-white-300/40 font-heading relative block w-full cursor-pointer items-center border-b-2 py-3 font-abcWhyteVar text-white transition duration-300 hover:text-gray-200"
                >
                  Home
                </li>
              </Link>
              <Link href="/articles">
                <li
                  onClick={handleToggle}
                  className="border-white-300/40 font-heading relative block w-full cursor-pointer items-center border-b-2 py-3 font-abcWhyteVar text-white transition duration-300 hover:text-gray-200"
                >
                  Articles
                </li>
              </Link>
              <a
                href="/Leslie_Lauw_Resume.pdf"
                target="__blank"
                rel="noopener norefferer"
              >
                <li className="variable-text mx-2 mt-10 min-w-[200px] rounded-lg bg-gradient-to-tr from-amber-300 to-teal-300 px-2 py-2 text-center uppercase text-zinc-900 transition duration-500">
                  Resume
                </li>
              </a>
            </ul>
          </div>
        </AnimatePresence>
      </motion.div>
    );
  }
  return <></>;
};

export default MobileMenu;
