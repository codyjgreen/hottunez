import React from 'react';
import Playlist from './playlist';

const Playlists = ({
    children,
    playlists,
    currentPlaylist,
    onPlayClick,
    onRemoveClick,
    onPlaylistClick,
    isPlaylistSaved,
    onSaveClick,
    onDeleteClick
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
        playlist={currentPlaylist} />
      { (!isPlaylistSaved) &&
        <button onClick={() => onSaveClick(currentPlaylist)}>
          Save playlist
        </button>
      }
      {
        (currentPlaylist.songs.length !== 0) &&
        <button onClick={() => onDeleteClick(currentPlaylist)}>
          Delete playlist
        </button>
      }
    </div>
  );
};

export default Playlists;
