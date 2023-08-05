import React, { useContext } from "react";
import SpotifyContext from "../../context/SpotifyContext";
import CardItem from "./CardItem";

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
