import React, { useRef, useState } from "react";
import { Video } from "../types";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import bg from "../utils/bg.png";
import { GoVerified } from "react-icons/go";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };
  console.log(post?.video?.asset?.url);
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded items-center">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  //host picture error : add image domain 1hr38min :in nextconfig
                  src={post?.postedBy?.image || bg}
                  alt={"profile photo"}
                  className="rounded-full"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex flex-row items-center gap-2">
                <p className="md:text-md font-bold text-primary">{`${post?.postedBy?.userName} `}</p>
                <p>
                  <GoVerified className="text-blue-400 text-md gap-2" />
                </p>
                <p className=" capitalize text-xs font-medium text-gray-500 hidden md:block">{`${post?.postedBy?.userName} `}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 flex-gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <Link href={`/detail/${post?._id}`}>
            <video
              loop
              ref={videoRef}
              className="w-[600]px h-[300]px md:h-[400]px lg:h=[530]px w-[200]px rounded-2xl cursor-pointer bg-gray-100"
              src={post?.video?.asset?.url}
            ></video>
          </Link>
          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
