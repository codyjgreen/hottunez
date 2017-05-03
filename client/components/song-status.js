import React from 'react';

const SongStatus = ({ song }) => {
  if (Object.keys(song).length === 0) {
    return (
      <h2>Choose a hot song</h2>
    );
  }

  return (
    <h2 className="selected-song">{ `${song.artist} - ${song.title}` }</h2>
  );
};

export default SongStatus;
