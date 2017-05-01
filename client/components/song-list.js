import React from 'react';
import SongListEntry from './song-list-entry';

const SongList = ({ songs }) => {
  return (
    <ul>
      { songs.map(song => {
          return (
            <SongListEntry song={song} />
          );
        })
      }
    </ul>
  );
};

export default SongList;
