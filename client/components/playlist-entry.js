import React from 'react';

const PlaylistEntry = ({ song, num }) => {
  return (
    <tr>
      <td>{num}</td>
      <td>{song.artist}</td>
      <td>{song.album}</td>
      <td>{song.title}</td>
    </tr>
  );
};

export default PlaylistEntry;
