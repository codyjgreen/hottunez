import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AudioPlayer from './components/audio-player';
import Playlists from './components/playlists';
import SongList from './components/song-list';

class App extends Component {
  constructor(props) {
    super(props);

    this.onSongClick = this.onSongClick.bind(this);

    this.state = {
      songs: [],
      currentSong: {},
      playlists: [],
      currentPlaylist: {}
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/songs')
      .then(res => res.json())
      .then(res => {
        this.setState({ songs: res.results });
        this.setState({ currentSong: this.state.songs[0] });
      });

    fetch('http://localhost:8080/api/playlists')
      .then(res => res.json())
      .then(res => {
        this.setState({ playlists: res.results });
      });
  }

  onSongClick(song) {
    this.setState({ currentSong: song });
  }

  render() {
    return (
      <div>
        <h1>hotTUNEZ</h1>
        <AudioPlayer song={this.state.currentSong} />
        <Playlists playlists={this.state.playlists}>
          Playlists
        </Playlists>
        <SongList
          onPlayClick={this.onSongClick}
          songs={this.state.songs}>
          Library
        </SongList>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
