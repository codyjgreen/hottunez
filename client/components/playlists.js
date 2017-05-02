import React from 'react';
import Playlist from './playlist';

const Playlists = ({ children, playlists, currentPlaylist, onPlayClick }) => {
  return (
    <div>
      <h2>{ children }</h2>
      <ul>
        { playlists.map(playlist => {
            return (
              <li key={playlist._id}>
                {playlist.name}
              </li>
            );
          })
        }
      </ul>
      <Playlist
        onPlayClick={onPlayClick}
        songs={currentPlaylist} />
    </div>
  );
};

export default Playlists;
