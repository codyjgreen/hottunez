import React from 'react';
import Playlist from './playlist';

const Playlists = ({
    children,
    playlists,
    currentPlaylist,
    onPlayClick,
    onRemoveClick,
    onPlaylistClick,
    isPlaylistSaved
}) => {
  return (
    <div>
      <h2>{ children }</h2>
      <ul>
        { playlists.map(playlist => {
            return (
              <li
                key={playlist._id}
                onClick={() => onPlaylistClick(playlist)}>
                {playlist.name}
              </li>
            );
          })
        }
      </ul>
      <Playlist
        onPlayClick={onPlayClick}
        onRemoveClick={onRemoveClick}
        songs={currentPlaylist} />
      { (!isPlaylistSaved) && <button>Save</button> }
    </div>
  );
};

export default Playlists;
