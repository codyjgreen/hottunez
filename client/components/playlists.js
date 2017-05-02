import React from 'react';
import Playlist from './playlist';
import CreatePlaylist from './create-playlist';

const Playlists = ({
    children,
    playlists,
    currentPlaylist,
    onPlayClick,
    onRemoveClick,
    onPlaylistClick,
    isPlaylistSaved,
    onSaveClick,
    onDeleteClick,
    onPlaylistAdd
}) => {
  return (
    <div>
      <h2>{ children }</h2>
      <CreatePlaylist onPlaylistAdd={onPlaylistAdd} />
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
        (currentPlaylist.name !== undefined) &&
        <button onClick={() => onDeleteClick(currentPlaylist)}>
          Delete playlist
        </button>
      }
    </div>
  );
};

export default Playlists;
