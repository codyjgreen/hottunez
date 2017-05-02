import React from 'react';

const PlaylistEntry = ({ onPlayClick, onRemoveClick, song, num }) => {
  return (
    <tr>
      <td>{num}</td>
      <td>{song.artist}</td>
      <td>{song.album}</td>
      <td>{song.title}</td>
      <td onClick={() => onPlayClick(song)}>Play</td>
      <td onClick={() => onRemoveClick(song)}>Remove</td>
    </tr>
  );
};

export default PlaylistEntry;
