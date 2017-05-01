import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AudioPlayer from './components/audio-player';
import SongList from './components/song-list';

class App extends Component {
  constructor(props) {
    super(props);

    this.onSongClick = this.onSongClick.bind(this);

    this.state = {
      songs: [],
      currentSong: {}
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/songs')
      .then(res => res.json())
      .then(res => {
        this.setState({ songs: res.results });
        this.setState({ currentSong: this.state.songs[0] });
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
        <SongList
          onClick={this.onSongClick}
          songs={this.state.songs}>
          All Songs
        </SongList>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
