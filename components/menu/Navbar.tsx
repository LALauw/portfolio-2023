import { useEffect, useState } from "react";
import Hamburger from "./Hamburger";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

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
      <nav className="fixed top-0 z-40 h-20 w-full max-w-[1600px] rounded border-opacity-40 bg-dark-bg p-3 px-5 shadow-none backdrop-blur transition duration-300 ">
        <div className="relative flex h-full w-full cursor-pointer justify-between rounded text-center transition duration-300">
          <div className="variable-text flex flex-col gap-0 text-left text-zinc-100">
            <h1 className="text-4xl uppercase">Portfolio</h1>
            <h2 className="text-sm ">by L.A. Lauw</h2>
          </div>

          <div className="hidden gap-5 md:flex">
            {/* <DarkModeToggle /> */}
            <ul className="flex items-center gap-5 text-white">
              <Link href="/">
                <li className="variable-text mx-5 font-abcWhyteVar text-lg uppercase">
                  Home.
                </li>
              </Link>
              <Link href="/articles">
                <li className="variable-text mx-5 font-abcWhyteVar text-lg uppercase">
                  Articles.
                </li>
              </Link>

              <li className="variable-text mx-2 rounded-lg bg-gradient-to-tr from-amber-300 to-teal-300 px-2 py-2 uppercase text-zinc-900 transition duration-500">
                <a
                  href="https://google.com"
                  rel="noreferrer noopener"
                  target="_blank"
                ></a>
                Resume
              </li>
            </ul>
          </div>
          <Hamburger handleToggle={handleToggle} />
        </div>
      </nav>
      <MobileMenu handleToggle={handleToggle} props={active} />
    </>
  );
};

export default Navbar;
