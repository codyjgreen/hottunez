import React from 'react';

const SongList = ({ songs }) => {
  return (
    <ul>
      { songs.map(song => {
          return (
            <li>
              { `${song.artist} - ${song.title}` }
            </li>
          );
        })
      }
    </ul>
  );
};

module.exports = SongList;
