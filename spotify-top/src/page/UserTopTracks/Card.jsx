import React, { useContext } from "react";
import SpotifyContext from "../../context/SpotifyContext";
import CardItem from "./CardItem";

const Card = () => {
  const { userTopTracks } = useContext(SpotifyContext);

  if (!userTopTracks || !userTopTracks.items) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        <CardItem track={{}} />
      </div>
    );
  }

  const { items } = userTopTracks;

  return (
    <div>
      {items.map((item, index) => (
        <div key={item.id} className="mb-4">
          <CardItem track={item} index={index} />
        </div>
      ))}
    </div>
  );
};

export default Card;
