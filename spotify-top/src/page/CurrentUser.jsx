import React, { useContext, useEffect, useState } from "react";
import SpotifyContext from "../context/SpotifyContext";
import ContentLoader from "react-content-loader";
import { useInView } from "react-intersection-observer";

const CurrentUser = ({ logout }) => {
  const { currentUser } = useContext(SpotifyContext);
  const [loading, setLoading] = useState(true); // Local loading state
  const [ref, isVisible] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (isVisible) {
      setLoading(false); // Set the loading state to false once the component is in view
    }
  }, [isVisible]);

  if (!currentUser || !currentUser.images || currentUser.images.length === 0) {
    // Return the loading skeleton while waiting for data
    return (
      <ContentLoader
        speed={2}
        width={300}
        height={70}
        viewBox="0 0 300 70"
        backgroundColor="rgba(50, 50, 51, 0.5)"
        foregroundColor="rgba(147, 156, 179, 0.22)"
        style={{ opacity: loading ? 1 : 0 }} // Show/hide the loading skeleton
      >
        <circle cx="30" cy="30" r="30" />
        <rect x="70" y="15" rx="4" ry="4" width="200" height="15" />
      </ContentLoader>
    );
  }

  const { display_name, external_urls } = currentUser;

  return (
    <div>
      <div
        ref={ref} // Attach the ref to the root element to check visibility
        className="flex items-center justify-between bg-violet-950 rounded-b-2xl text-white px-5 py-2"
      >
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
            target="_blank"
            rel="noopener noreferrer"
          >
            {display_name}
          </a>
        </div>
        <button
          onClick={logout}
          className="text-red-500 text-xl hover:opacity-50 duration-150 ease-in"
          aria-label="Logout" // Add a descriptive label for accessibility
        >
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
