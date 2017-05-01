import React from 'react';
import SongListEntry from './song-list-entry';

const SongList = ({ songs }) => {
  return (
    <ul>
      { songs.map(song => {
          return (
            <SongListEntry
              key={song._id}
              song={song} />
          );
        })
      }
    </ul>
  );
};

export default SongList;
