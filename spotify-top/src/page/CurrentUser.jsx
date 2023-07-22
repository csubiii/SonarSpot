import React, { useContext, useEffect } from "react";
import SpotifyContext from "../context/SpotifyContext";

import { TailSpin } from "react-loader-spinner";

const CurrentUser = ({ logout }) => {
  const { currentUser } = useContext(SpotifyContext);

  if (!currentUser || !currentUser.images || currentUser.images.length === 0) {
    // Return some placeholder content or loading indicator while waiting for data
    return <TailSpin
    height="40"
    width="40"
    color="#f2f"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />;
  }

  const { display_name, external_urls} = currentUser;

  return (
    <div>
      <div className="flex items-center justify-between bg-slate-900 text-white px-5 py-2">
        <div className="flex items-center gap-3">
          <img
            className="rounded-full"
            width={40}
            height={40}
            src={currentUser.images[0].url}
            alt="profile picture"
          />
          <a
            className="font-bold text-xl hover:opacity-50 duration-150 ease-in"
            href={external_urls.spotify}
            target="blank_"
          >
            {display_name}
          </a>
        </div>
          <button onClick={logout} className="text-red-500 text-xl hover:opacity-50 duration-150 ease-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </button>
      </div>
    </div>
  );
};

export default CurrentUser;