import React from 'react';

const SongStatus = ({ song }) => {
  if (Object.keys(song).length === 0) {
    return (
      <h2>Loading...</h2>
    );
  }

  return (
    <h2>{ `${song.artist} - ${song.title}` }</h2>
  );
};

export default SongStatus;
