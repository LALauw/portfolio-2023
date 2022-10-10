const ListComponent = ({ children, props }: any) => {
  return (
    <ol start={1} className="ml-10 mb-4 list-disc">
      {children}
    </ol>
  );
};

export default ListComponent;
