import React, { useContext, useEffect } from 'react';
import SpotifyContext from '../../context/SpotifyContext';
import PlayingComponent from './PlayingComponent';

const CurrentPlayingComponent = () => {
  const { getPlaybackState, playbackState, token } = useContext(SpotifyContext);

  useEffect(() => {
    const fetchData = async () => {
      await getPlaybackState(token);
    };

    fetchData();

    const interval = setInterval(fetchData, 1000); // Fetch playback state every second

    return () => clearInterval(interval);
  }, []);

  // Check if playbackState is defined before accessing its properties
  const canPause = playbackState && !playbackState.actions?.disallows?.pausing;

  return (
    <div className="flex justify-center">
      {canPause && <PlayingComponent playbackState={playbackState} />}
    </div>
  );
};

export default CurrentPlayingComponent;
