import Image from "next/image";
import { useState } from "react";
import ImageGallery from "react-image-gallery";

const VideoComponent = (props: any) => {
  console.log(props);
  return (
    <div className="min-5-[500px] relative mx-auto mb-5 mt-5 flex w-[95%] cursor-pointer rounded object-cover md:max-w-[85%]"></div>
  );
};

export default VideoComponent;
