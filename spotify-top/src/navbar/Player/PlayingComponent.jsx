import React, { useEffect, useState } from 'react';

const ArtistName = React.memo(({ artist }) => (
  <a
    href={artist.external_urls.spotify}
    target="_blank"
    rel="noopener noreferrer"
    className="text-purple-500 hover:underline"
  >
    {artist.name}
  </a>
));

const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const PlayingComponent = ({ playbackState }) => {
  const [currentTime, setCurrentTime] = useState(playbackState?.progress_ms || 0);

  useEffect(() => {
    let interval;

    if (playbackState?.is_playing) {
      const updateCurrentTime = () => {
        setCurrentTime(prevTime => prevTime + 1000); // Increment by 1 second
      };

      interval = setInterval(updateCurrentTime, 1000);

      return () => clearInterval(interval);
    }
  }, [playbackState]);

  useEffect(() => {
    if (playbackState) {
      setCurrentTime(playbackState.progress_ms || 0); // Update progress_ms
    }
  }, [playbackState?.progress_ms]);

  if (!playbackState?.is_playing || !playbackState?.item) {
    return null;
  }

  const { album, external_urls, name, duration_ms, artists } = playbackState.item;

  const artistNames = artists.map(artist => (
    <ArtistName key={artist.id} artist={artist} />
  ));

  const progressBarWidth = `${(currentTime / (duration_ms || 1)) * 100}%`;

  return (
    <div className="bg-gray-900 p-3 py-2 rounded-lg w-96 h-auto flex items-center">
      <div className="relative flex-shrink-0 w-[50px] h-[50px] mr-3">
        <a href={album.external_urls.spotify} target="_blank" rel="noopener noreferrer">
          <img src={album.images[0]?.url} alt={album.name} className="rounded-md shadow-md w-full h-full" />
        </a>
      </div>
      <div className="flex-grow">
        <h2 className="text-white text-sm font-semibold">
          <a href={external_urls.spotify} target="_blank" rel="noopener noreferrer" className="hover:underline">
            <p className="playing-text truncate w-[300px]">
              {name}
            </p>
          </a>
        </h2>
        <p className="text-gray-400 text-xs">
          {artistNames.reduce((prev, curr) => [prev, ', ', curr])}
        </p>
        <div className="flex items-center mt-1">
          <div className="flex-grow">
            <div className="bg-gray-800 h-1 rounded-full">
              <div className="bg-purple-500 h-1 rounded-full" style={{ width: progressBarWidth }}></div>
            </div>
          </div>
          <span className="text-gray-400 text-xs ml-2">
            {formatTime(currentTime)} / {formatTime(duration_ms)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayingComponent;
