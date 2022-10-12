const CodeComponent = (props: any) => {
  console.log(props);
  return (
    <pre>
      <code className="js">{props.children}</code>
    </pre>
  );
};

export default CodeComponent;
