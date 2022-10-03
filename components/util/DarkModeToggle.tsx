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
    <button onClick={() => setTheme(isDark === "dark" ? "light" : "dark")}>
      {isDark === "dark" ? (
        <div className="rounded-full bg-green-400 p-2 transition duration-300 ease-in-out hover:bg-zinc-400">
          <BsFillSunFill size={15} fill="#000000" />
        </div>
      ) : (
        <div className="rounded-full bg-zinc-900 p-2 transition  duration-300 ease-in-out">
          <BsFillMoonStarsFill size={15} fill="#FFFFFF" />
        </div>
      )}
    </button>
  );
};
export default DarkModeToggle;
