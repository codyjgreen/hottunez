import React from 'react';

const PlaylistEntry = ({ onPlayClick, onRemoveClick, song, num, currentSong }) => {
  let cssClasses = ''
  if (song._id === currentSong._id) {
    cssClasses = 'selected-song'
  }

  return (
    <tr className={cssClasses}>
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
