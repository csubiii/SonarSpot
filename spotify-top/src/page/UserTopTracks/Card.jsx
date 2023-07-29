import React, { useContext } from "react";
import SpotifyContext from "../../context/SpotifyContext";

const Card = () => {
  const { userTopArtists } = useContext(SpotifyContext);
  console.log(userTopArtists)

  // Check if userTopArtists is undefined or empty before using it
  if (!userTopArtists || !userTopArtists.items || userTopArtists.items.length === 0) {
    return <div>Loading...</div>; // or any other loading indicator
  }
  
 // Map through the "items" array and extract the names
const artistNames = userTopArtists.items.map((item) => item.name);
const artistPic = userTopArtists.items.map((item) => item.images[0].url);

// Output the names
console.log(artistNames, artistPic);
return (
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {userTopArtists.items.map((item) => (
    <div key={item.id} className="bg-white p-4 shadow-md rounded-lg">
      <img className="w-[500px] h-[500px] object-cover mb-2" src={item.images[0].url} alt={`${item.name} picture`} />
      <p className="text-xl font-semibold">{item.name}</p>
    </div>
  ))}
</div>

);

};

export default Card;
