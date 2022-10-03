import DarkModeToggle from "@/components/util/DarkModeToggle";
import { useEffect, useState } from "react";
import Hamburger from "./Hamburger";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import MobileMenu from "./MobileMenu";

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
      enableBodyScroll(document.body);
    }
  }, [active]);

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="fixed top-5 z-40 h-20 w-full max-w-[1600px] rounded border-opacity-40 p-3 px-5 shadow-none backdrop-blur transition duration-300 ">
        <div className="relative flex h-full w-full cursor-pointer justify-between rounded text-center transition duration-300">
          <div className="variable-text flex flex-col gap-0 text-left text-zinc-900 dark:text-zinc-100">
            <h1 className="text-4xl uppercase">Portfolio</h1>
            <h2 className="text-sm ">by L.A. Lauw</h2>
          </div>

          <div className="hidden gap-5 md:flex">
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
      <MobileMenu handleToggle={handleToggle} props={active} />
    </>
  );
};

export default Navbar;
