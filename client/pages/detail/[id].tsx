import axios from "axios";
import React, { useRef, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { Video } from "../../types";
interface IProps {
  postDetails: Video;
}
const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const onVideoClick = () => {};

  if (!post) return null;
  return (
    <div className=" flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      {/* <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center "> */}
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-500">
          <p className="">
            <MdOutlineCancel className="text-white text-35px" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              src={post?.video?.asset?.url}
              className="cursor-pointer h-full"
              ref={videoRef}
              onClick={() => {}}
              loop
            ></video>
          </div>
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {isPlaying && (
              <button className="" onClick={onVideoClick}>
                <BsFillPlayFill
                  className="text-white text-6xl lg:text-8x;"
                  onClick={() => {}}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`http://localhost:3000/api/post/${id}`);

  return {
    props: { postDetails: data },
  };
};
export default Detail;
