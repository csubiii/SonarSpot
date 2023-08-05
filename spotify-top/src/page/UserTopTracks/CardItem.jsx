import React, { memo, useState, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ContentLoader from "react-content-loader";

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

const CardItem = memo(({ track, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isLoading = !track?.album?.images?.length;
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (inView) {
      setImageLoaded(true);
    }
  }, [inView]);

  const preferredImageSize = 200;

  return (
    <div className="p-4 shadow-md rounded-md flex flex-col items-center md:flex-row md:items-stretch relative">
      <span
        className="mb-2 md:mb-0 md:mr-4 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold"
        style={{ color: "#8B5CF6", fontSize: "2rem" }}
      >
        {isLoading ? <CommonContentLoader width={12} height={12} /> : index + 1}
      </span>
      <div className="relative flex-shrink-0 w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-md overflow-hidden">
        {isLoading ? (
          <CommonContentLoader width={preferredImageSize} height={preferredImageSize} />
        ) : (
          <img
            className={`w-[150px] h-[150px] object-cover ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            src={imageLoaded ? track?.album?.images?.[0]?.url || "" : ""}
            alt={`${track?.name || "Unknown"} picture`}
            loading="lazy"
            width={preferredImageSize}
            height={preferredImageSize}
          />
        )}
      </div>
      <div className="mt-2 md:mt-0 md:ml-4 text-gray-300 font-semibold text-center md:text-left break-all">
        <a
          href={track?.external_urls?.spotify || ""}
          className={`block text-${isLoading ? "transparent" : "gray-300"} text-md font-semibold hover:opacity-50 duration-150 ease-in`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {isLoading ? (
            <CommonContentLoader width={160} height={16} />
          ) : (
            <span>
              {track?.name || "Unknown"}
            </span>
          )}
        </a>
        <p className="text-sm text-gray-500">
          {isLoading ? (
            <CommonContentLoader width={140} height={12} />
          ) : (
            track?.artists.map((artist) => artist.name).join(", ")
          )}
        </p>
      </div>
    </div>
  );
});

export default CardItem;
