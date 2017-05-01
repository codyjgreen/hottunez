import React from 'react';

const AudioPlayer = ({ song }) => {
  return (
    <audio controls src={song.url} />
  );
};

export default AudioPlayer;
