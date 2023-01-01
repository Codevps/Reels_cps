import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { GoVerified } from "react-icons/go";
import NoResults from "../../components/NoResults";
import VideoCard from "../../components/VideoCard";
import useAuthStore from "../../store/authStore";
import { IUser, Video } from "../../types";

const Search = ({ videos }: { videos: Video[] }) => {
  const [showAccount, setShowAccount] = useState(false);
  const { allUsers }: any = useAuthStore();
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const isAccounts = showAccount ? `border-b-2 border-black` : `text-gray-400`;
  const isVideos = !showAccount ? `border-b-2 border-black` : `text-gray-400`;
  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl mt-2 font-semibold cursor-pointer ${isAccounts}`}
          onClick={() => setShowAccount(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl mt-2 font-semibold cursor-pointer ${isVideos}`}
          onClick={() => setShowAccount(false)}
        >
          Videos
        </p>
      </div>
      {showAccount ? (
        <div className="md:mt-16 ">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className="flex p-2 cursor-pointer border-b-2 font-semibold rounded border-gray-200 gap-3">
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user profile"
                    />
                    <div className="hidden xl:bock">
                      <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                        {user?.userName?.replaceAll(" ", "")}
                        <GoVerified className="text-blue-400" />
                      </p>
                      <p className="capitalize text-gray-400 text-xs">
                        {user?.userName}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults
              text={`No accounts available with term ${searchTerm}!`}
            />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length > 0 ? (
            videos.map((video: Video, idx: number) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <NoResults text={`No Videos available on ${searchTerm} yet!`} />
          )}
        </div>
      )}
    </div>
  );
};
export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`http://localhost:3000/api/search/${searchTerm}`);

  return {
    props: {
      videos: res.data,
    },
  };
};
export default Search;
