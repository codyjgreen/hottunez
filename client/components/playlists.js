import React from 'react';

const Playlists = ({ children, playlists }) => {
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
    </div>
  );
};

export default Playlists;
