import React from 'react';

const SongListEntry = ({ onPlayClick, onAddClick, song, num }) => {
  return (
    <tr>
      <td>{num}</td>
      <td>{song.artist}</td>
      <td>{song.album}</td>
      <td>{song.title}</td>
      <td onClick={() => onPlayClick(song)}>
        <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
      </td>
      <td onClick={() => onAddClick(song)}>
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </td>
    </tr>
  );
};

export default SongListEntry;
