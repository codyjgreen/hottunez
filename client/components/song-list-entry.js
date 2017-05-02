import React from 'react';

const SongListEntry = ({ onPlayClick, onAddClick, song, num }) => {
  return (
    <tr>
      <td>{num}</td>
      <td>{song.artist}</td>
      <td>{song.album}</td>
      <td>{song.title}</td>
      <td onClick={() => onPlayClick(song)}>Play</td>
      <td onClick={() => onAddClick(song)}>Add to playlist</td>
    </tr>
  );
};

export default SongListEntry;
