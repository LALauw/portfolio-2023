import Image from "next/image";
const ImageComponent = (props: any) => {
  return (
    <div className="relative mx-auto flex min-h-[500px] w-[95%] rounded object-cover md:max-w-[75%]">
      <Image layout="fill" objectFit="contain" src={props.src} />
    </div>
  );
};

export default ImageComponent;
