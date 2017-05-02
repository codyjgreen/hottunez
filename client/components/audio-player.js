import React from 'react';

const AudioPlayer = ({ song, onSongEnd }) => {
  return (
    <audio
      controls
      autoPlay
      onEnded={() => onSongEnd()}
      src={song.url ? song.url : ''} />
  );
};

export default AudioPlayer;
