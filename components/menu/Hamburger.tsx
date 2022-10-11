const Hamburger = ({ handleToggle }: any) => {
  return (
    <div
      className="group flex flex-col items-center justify-center space-y-2 md:hidden"
      onClick={handleToggle}
    >
      <div className="h-0.5 w-8 bg-white transition duration-300 group-hover:bg-neutral-300"></div>
      <div className="h-0.5 w-8 bg-white transition duration-300 group-hover:bg-neutral-300"></div>
      <div className="h-0.5 w-8 bg-white transition duration-300 group-hover:bg-neutral-300"></div>
    </div>
  );
};

export default Hamburger;
