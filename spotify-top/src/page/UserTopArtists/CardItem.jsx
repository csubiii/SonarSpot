import React, { useContext, useState, memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ContentLoader from "react-content-loader";
import SpotifyContext from "../../context/SpotifyContext";

const CommonContentLoader = ({ width, height }) => (
  <ContentLoader
    speed={2}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    backgroundColor="rgba(50, 50, 51, 0.5)"
    foregroundColor="rgba(147, 156, 179, 0.22)"
  >
    <rect x="0" y="0" rx="8" ry="8" width={width} height={height} />
  </ContentLoader>
);

const CardItem = memo(({ artist }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isLoading = !artist || !artist.images || artist.images.length === 0;
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (inView) {
      setImageLoaded(true);
    }
  }, [inView]);

  const preferredImageSize = 320;

  return (
    <div className="p-4 bg-zinc-900 shadow-md rounded-md">
      <div className="grid justify-items-start">
        <div ref={ref} className="w-[150px] h-[150px] mb-2 rounded-md overflow-hidden">
          {isLoading ? (
            <CommonContentLoader width={150} height={150} />
          ) : (
            <img
              className={`w-[150px] h-[150px] object-cover ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              src={artist.images[1]?.url || ""}
              alt={`${artist.name || "Unknown"} picture`}
              width={preferredImageSize}
              height={preferredImageSize}
              loading="lazy"
            />
          )}
        </div>
        <a
          href={artist?.external_urls?.spotify || ""}
          className={`text-${isLoading ? "transparent" : "gray-300"} text-md text-gray-300 font-semibold truncate hover:opacity-50 duration-150 ease-in`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {isLoading ? (
            <CommonContentLoader width={80} height={16} />
          ) : (
            artist.name || "Unknown"
          )}
        </a>
      </div>
    </div>
  );
});

export default CardItem;
