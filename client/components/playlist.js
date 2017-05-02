import React from 'react';
import PlaylistEntry from './playlist-entry';

const Playlist = ({ children, songs, onPlayClick }) => {
  console.log(songs)
  return (
    <div>
      <h3>{children}</h3>
      <table>
        <tbody>
          <tr>
            <th>#</th>
            <th>Arist</th>
            <th>Album</th>
            <th>Title</th>
          </tr>
          { songs.map((song, i) => {
              return (
                <PlaylistEntry
                  key={song._id}
                  num={i + 1}
                  onPlayClick={onPlayClick}
                  song={song} />
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Playlist;
