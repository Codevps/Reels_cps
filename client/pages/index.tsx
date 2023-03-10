import React from "react";
import type { NextPage } from "next";
import axios from "axios";
import { Video } from "../types";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
interface IProps {
  videos: Video[];
}
const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos?.length ? (
        videos?.map((video: Video) => (
          <VideoCard key={video?._id} post={video} />
        ))
      ) : (
        <NoResults text={"No videos"} />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { pathname },
}: {
  query: { pathname: string };
}) => {
  let response = null;
  if (pathname) {
    response = await axios.get(
      `http://localhost:3000/api/discover/${pathname}`
    );
  } else {
    response = await axios.get(`http://localhost:3000/api/post`);
  }
  return {
    props: {
      videos: response.data,
    },
  };
};
export default Home;
