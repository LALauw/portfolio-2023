import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useState } from "react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState("dark");

  useEffect(() => {
    if (theme) setIsDark(theme);
  });
  return (
    <button
      className={` px-5 ${
        isDark === "dark" ? "bg-green-500" : "bg-zinc-400"
      } rounded-full `}
      onClick={() => setTheme(isDark === "dark" ? "light" : "dark")}
    >
      {isDark === "dark" ? (
        <div className="bg-zinc-900 rounded-full p-2 transition ease-in-out duration-300 translate-x-4">
          <BsFillSunFill size={15} fill="#FFFFFF" />
        </div>
      ) : (
        <div className="bg-zinc-900 rounded-full p-2 transition duration-300 ease-in-out  -translate-x-4">
          <BsFillMoonStarsFill size={15} fill="#FFFFFF" />
        </div>
      )}
    </button>
  );
};
export default DarkModeToggle;
