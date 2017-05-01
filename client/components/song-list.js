import React from 'react';
import SongListEntry from './song-list-entry';

const SongList = ({ children, onClick, songs}) => {
  return (
    <div>
      <h2>{ children }</h2>
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
    </div>
  );
};

export default SongList;
