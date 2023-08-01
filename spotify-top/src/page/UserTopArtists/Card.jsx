import React, { useContext, useState, memo } from "react";
import { useInView } from "react-intersection-observer";
import ContentLoader from "react-content-loader";
import SpotifyContext from "../../context/SpotifyContext";

const CardItem = memo(({ artist }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isLoading = !artist || !artist.images || artist.images.length === 0;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Define the preferred image size (medium in this case) to be used for the artist's picture
  const preferredImageSize = 320; // Change this based on your layout and design needs

  return (
    <div className="p-4 bg-zinc-900 shadow-md rounded-md">
      <div className="grid justify-items-start">
        <div
          ref={ref}
          className="w-[150px] h-[150px] mb-2 rounded-md overflow-hidden"
        >
          {isLoading || !inView ? (
            <ContentLoader
              speed={2}
              width={150}
              height={150}
              viewBox="0 0 150 150"
              backgroundColor="rgba(50, 50, 51, 0.5)"
              foregroundColor="rgba(147, 156, 179, 0.22)"
            >
              {/* The skeleton loading state for the image */}
              <rect x="0" y="0" rx="8" ry="8" width="150" height="150" />
            </ContentLoader>
          ) : (
            <img
              className={`w-full h-full object-cover ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              src={artist.images[0]?.url || ""}
              alt={`${artist.name || "Unknown"} picture`}
              onLoad={handleImageLoad}
              loading="lazy" // Native lazy-loading attribute
              // Dynamically set the size of the image based on the preferredImageSize
              width={preferredImageSize}
              height={preferredImageSize}
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
            <ContentLoader
              speed={2}
              width={80}
              height={16}
              viewBox="0 0 80 16"
              backgroundColor="rgba(50, 50, 51, 0.5)"
              foregroundColor="rgba(147, 156, 179, 0.22)"
            >
              {/* The skeleton loading state for the name */}
              <rect x="0" y="0" rx="4" ry="4" width="80" height="16" />
            </ContentLoader>
          ) : (
            artist.name || "Unknown"
          )}
        </a>
      </div>
    </div>
  );
});

const Card = () => {
  const { userTopArtists } = useContext(SpotifyContext);

  if (!userTopArtists || !userTopArtists.items) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        <CardItem artist={{}} />
      </div>
    );
  }

  const { items } = userTopArtists;

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {items.map((item) => (
        <CardItem key={item.id} artist={item} />
      ))}
    </div>
  );
};

export default Card;
