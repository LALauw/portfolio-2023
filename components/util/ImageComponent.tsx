import Image from "next/image";

const ImageComponent = (props: any) => {
  return (
    <div className="relative mx-auto mb-5 mt-5 flex min-h-[150px] w-[95%] rounded object-cover md:max-w-[85%]">
      <Image
        width={1920}
        height={1080}
        layout="intrinsic"
        objectFit="contain"
        src={props.src}
      />
    </div>
  );
};

export default ImageComponent;
