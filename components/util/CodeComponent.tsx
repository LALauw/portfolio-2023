const CodeComponent = (props: any) => {
  return (
    <pre>
      <code className="js">{props.children}</code>
    </pre>
  );
};

export default CodeComponent;
