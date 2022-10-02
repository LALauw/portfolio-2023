import DarkModeToggle from "@/components/util/DarkModeToggle";
import { useEffect, useState } from "react";
import Hamburger from "./Hamburger";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const Navbar = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const nav = document.querySelector("nav");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      if (lastScrollY < window.scrollY) {
        nav!.classList.add("nav--hidden");
      } else {
        nav!.classList.remove("nav--hidden");
      }
      lastScrollY = window.scrollY;
    });
  });

  useEffect(() => {
    if (active) {
      disableBodyScroll(document.body);
    } else {
      disableBodyScroll(document.body);
    }
  }, [active]);

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <nav className="fixed top-5 mx-auto w-[85%] h-16 rounded backdrop-blu shadow-none border-opacity-40 p-3 transition duration-300">
      <div className="h-full w-full transition duration-300 text-center flex justify-between rounded cursor-pointer">
        <div className="variable-text text-zinc-900 dark:text-zinc-100 flex flex-col text-left gap-0">
          <h1 className="text-4xl uppercase">Portfolio</h1>
          <h2 className="text-sm ">by L.A. Lauw</h2>
        </div>

        <div className="hidden md:flex gap-5">
          <div className="mx-2 uppercase text-zinc-900 variable-text bg-zinc-300 dark:zinc-500 rounded-full px-5 py-2  transition duration-300">
            Resume
          </div>
          <DarkModeToggle />
          {/* <ul className="flex items-center gap-5">
            <li className="variable-text  uppercase bg-gray-500 rounded-full px-5 py-2 hover:bg-gray-700 transition duration-300">
              <a href="#">Resume</a>
            </li>
            <li className="mx-5">
             
            </li>
          </ul> */}
        </div>
        <Hamburger handleToggle={handleToggle} props={active} />
      </div>
    </nav>
  );
};

export default Navbar;
