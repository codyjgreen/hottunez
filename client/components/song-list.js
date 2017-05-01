import React from 'react';
import SongListEntry from './song-list-entry';

const SongList = ({ onClick, songs }) => {
  return (
    <ul>
      { songs.map(song => {
          return (
            <SongListEntry
              key={song._id}
              onClick={onClick}
              song={song} />
          );
        })
      }
    </ul>
  );
};

export default SongList;
