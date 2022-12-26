import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";
import GoogleLogin from "react-google-login";
import { useRouter } from "next/router";

const SideBar = () => {
  const router = useRouter();
  const { topic } = router.query;
  const [setting, setSetting] = useState(true);
  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-semibold text-[#F51997 rounded ";
  const [showSideBar, setShowSideBar] = useState(false);
  const userProfile = false;

  useEffect(() => {
    if (topic === undefined || topic === null) {
      setSetting(true);
    } else {
      setSetting(false);
    }
  }, []);

  return (
    <div>
      <div
        className="block lx:hidden m-2 ml-6 mt-3 text-2xl"
        onClick={() => setShowSideBar((prev) => !prev)}
      >
        {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSideBar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl mr-1">
                  <AiFillHome className={`${setting && "text-[#F51997]"}`} />
                </p>
                <span
                  className={`text-xl hidden xl:block ${
                    setting && "text-[#F51997]"
                  }`}
                >
                  For You
                </span>
              </div>
            </Link>
          </div>
          <Discover topic={topic} setSetting={setSetting} />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default SideBar;
