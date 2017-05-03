import React from 'react';
import PlaylistEntry from './playlist-entry';

const Playlist = ({ children, playlist, onPlayClick, onRemoveClick, currentSong }) => {
  return (
    <div>
      <h3>{children}</h3>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>#</th>
            <th>Arist</th>
            <th>Album</th>
            <th>Title</th>
            <th></th>
            <th></th>
          </tr>
          { playlist.songs.map((song, i) => {
              return (
                <PlaylistEntry
                  key={song._id}
                  num={i + 1}
                  onPlayClick={onPlayClick}
                  onRemoveClick={onRemoveClick}
                  song={song}
                  currentSong={currentSong} />
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Playlist;
