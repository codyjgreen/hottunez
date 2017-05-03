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
      <td onClick={() => onPlayClick(song)}>
        <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
      </td>
      <td onClick={() => onRemoveClick(song)}>
        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
      </td>
    </tr>
  );
};

export default PlaylistEntry;
