import React from 'react';

const SongListEntry = ({ onClick, song }) => {
  return (
    <li onClick={() => onClick(song)}>
      { `${song.artist} - ${song.title}` }
    </li>
  );
};

export default SongListEntry;
