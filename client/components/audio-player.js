import React from 'react';

const AudioPlayer = ({ song }) => {
  return (
    <audio controls autoPlay src={song.url ? song.url : ''} />
  );
};

export default AudioPlayer;
