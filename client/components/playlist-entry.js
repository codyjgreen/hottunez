import React from 'react';

const PlaylistEntry = ({ onPlayClick, song, num }) => {
  return (
    <tr>
      <td>{num}</td>
      <td>{song.artist}</td>
      <td>{song.album}</td>
      <td>{song.title}</td>
      <td onClick={() => onPlayClick(song)}>Play</td>
      <td>Remove</td>
    </tr>
  );
};

export default PlaylistEntry;
