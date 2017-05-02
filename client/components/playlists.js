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
    onPlaylistAdd,
    currentSong
}) => {
  return (
    <div>
      <h2>{ children }</h2>
      <CreatePlaylist onPlaylistAdd={onPlaylistAdd} />
      <ul>
        { playlists.map(playlist => {
            let cssClasses = '';
            if (playlist._id === currentPlaylist._id) {
              cssClasses = 'selected-playlist';
            }

            return (
              <li
                key={playlist._id}
                className={cssClasses}
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
        playlist={currentPlaylist}
        currentSong={currentSong} />
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
