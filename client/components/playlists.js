import React from 'react';
import Playlist from './playlist';
import CreatePlaylist from './create-playlist';
import Checkbox from './checkbox';

const Playlists = ({
    children,
    playlists,
    currentPlaylist,
    onPlayClick,
    onRemoveClick,
    onPlaylistClick,
    onAutoplayClick,
    isPlaylistSaved,
    isShuffle,
    onShuffleClick,
    onSaveClick,
    onDeleteClick,
    onPlaylistAdd,
    isAutoplay,
    isLoggedIn,
    currentSong
}) => {
  return (
    <div>
      <h2>{ children }</h2>
      { (isLoggedIn)
        && <CreatePlaylist onPlaylistAdd={onPlaylistAdd} />
      }
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

      <Checkbox
        style="checkbox-inline"
        checked={isAutoplay}
        handleParentChange={onAutoplayClick}>
        Autoplay
      </Checkbox>

      <Checkbox
        style="checkbox-inline"
        checked={isShuffle}
        handleParentChange={onShuffleClick}>
        Shuffle
      </Checkbox>

      <Playlist
        onPlayClick={onPlayClick}
        onRemoveClick={onRemoveClick}
        playlist={currentPlaylist}
        currentSong={currentSong} />
      { (isLoggedIn && !isPlaylistSaved) &&
        <button onClick={() => onSaveClick(currentPlaylist)}>
          Save playlist
        </button>
      }
      {
        (isLoggedIn && currentPlaylist.name !== undefined) &&
        <button onClick={() => onDeleteClick(currentPlaylist)}>
          Delete playlist
        </button>
      }
    </div>
  );
};

export default Playlists;
