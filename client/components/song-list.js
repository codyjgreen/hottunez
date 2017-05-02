import React from 'react';
import SongListEntry from './song-list-entry';

const SongList = ({ children, onPlayClick, onAddClick, songs}) => {
  return (
    <div>
      <h2>{ children }</h2>
      <table>
        <tbody>
          <tr>
            <th>#</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Title</th>
          </tr>
          { songs.map((song, i) => {
              return (
                <SongListEntry
                  key={song._id}
                  onPlayClick={onPlayClick}
                  onAddClick={onAddClick}
                  num={i + 1}
                  song={song} />
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default SongList;
