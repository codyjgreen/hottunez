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
    currentSong
}) => {
  return (
    <div>
      <h2 className="playlist-title">{ children }</h2>
      <CreatePlaylist onPlaylistAdd={onPlaylistAdd} />
      <ul className="list-inline">
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
                <h4>{playlist.name}</h4>
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
      { (!isPlaylistSaved) &&
        <button
          className="btn btn-primary"
          onClick={() => onSaveClick(currentPlaylist)}>
          Save playlist
        </button>
      }
      {
        (currentPlaylist.name !== undefined) &&
        <button
          className="btn btn-danger"
          onClick={() => onDeleteClick(currentPlaylist)}>
          Delete playlist
        </button>
      }
    </div>
  );
};

export default Playlists;
