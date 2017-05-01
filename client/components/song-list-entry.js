import React from 'react';

const SongListEntry = ({ song }) => {
  return (
    <li>
      { `${song.artist} - ${song.title}` }
    </li>
  );
};

export default SongListEntry;
