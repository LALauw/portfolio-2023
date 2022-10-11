const CTA = () => {
  return (
    <footer id="cta" className="mx-auto mb-20 flex px-5">
      <div className="flex flex-col items-center justify-center gap-10 text-center">
        <h2 className="variable-text bg-gradient-to-tr from-amber-300 to-teal-300 bg-clip-text text-center text-3xl font-black uppercase text-transparent md:text-5xl ">
          Ready for an adventure?
        </h2>
        <p className=" font-abcWhyte text-base text-white md:text-xl">
          Have an exciting project where you need some help? <br /> Don&apos;t
          hesitate and let&apos;s have a{" "}
          <a href="mailto:cheddar_yeast0l@icloud.com">
            <span className="cursor-pointer font-abcWhyteVar text-white underline decoration-neutral-300 decoration-[3px] underline-offset-4 transition duration-500 hover:decoration-teal-300">
              chat.
            </span>
          </a>
        </p>
      </div>
    </footer>
  );
};
export default CTA;
