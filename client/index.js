import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AudioPlayer from './components/audio-player';
import Playlists from './components/playlists';
import SongList from './components/song-list';
import SongStatus from './components/song-status';

class App extends Component {
  constructor(props) {
    super(props);

    this.onSongClick = this.onSongClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onPlaylistClick = this.onPlaylistClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onPlaylistAdd = this.onPlaylistAdd.bind(this);
    this.onSongEnd = this.onSongEnd.bind(this);
    this.onAutoplayClick = this.onAutoplayClick.bind(this);

    this.state = {
      songs: [],
      currentSong: {},
      playlists: [],
      currentPlaylist: {songs: []},
      isPlaylistSaved: true,
      isAutoplay: true
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/songs')
      .then(res => res.json())
      .then(res => {
        this.setState({ songs: res.results });
        // this.setState({ currentSong: this.state.songs[0] });
      });

    fetch('http://localhost:8080/api/playlists')
      .then(res => res.json())
      .then(res => {
        this.setState({ playlists: res.results });
        this.setState({ currentPlaylist: this.state.playlists[0] });
      });
  }

  onSongClick(song) {
    this.setState({ currentSong: song });
  }

  onRemoveClick(songToBeRemoved) {
    const songs = this.state.currentPlaylist.songs.filter(song => song !== songToBeRemoved);
    this.setState({
      currentPlaylist: { ...this.state.currentPlaylist, songs },
      isPlaylistSaved: false
    });
  }

  onPlaylistClick(playlist) {
    this.setState({
      currentPlaylist: playlist,
      isPlaylistSaved: true
    });
  }

  onAddClick(song) {
    if (this.state.currentPlaylist.name !== undefined) {
      const songIds = this.state.currentPlaylist.songs.map(song => song._id);
      if (songIds.indexOf(song._id) === -1) {
        const songs = [...this.state.currentPlaylist.songs, song];
        this.setState({
          currentPlaylist: { ...this.state.currentPlaylist, songs},
          isPlaylistSaved: false
        });
      }
    }
  }

  onSaveClick(playlist) {
    fetch(`http://localhost:8080/api/playlists/${playlist._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({songs: playlist.songs})
    }).then(res => res.json())
      .then(() => this.setState({ isPlaylistSaved: true }))
      .then(() => fetch('http://localhost:8080/api/playlists'))
      .then(res => res.json())
      .then(res => this.setState({ playlists: res.results }));
  }

  onDeleteClick(playlist) {
    fetch(`http://localhost:8080/api/playlists/${playlist._id}`, {
      method: 'DELETE'
    }).then(() => fetch('http://localhost:8080/api/playlists'))
      .then(res => res.json())
      .then(res => {
        this.setState({ playlists: res.results });
        this.setState({
          currentPlaylist: {songs: []},
          isPlaylistSaved: true
        });
      });
  }

  onPlaylistAdd(name) {
    fetch('http://localhost:8080/api/playlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        songs: []
      })
    }).then(res => res.json())
      .then(playlist => this.setState({ currentPlaylist: playlist }))
      .then(() => fetch('http://localhost:8080/api/playlists'))
      .then(res => res.json())
      .then(res => this.setState({ playlists: res.results }));
  }

  onSongEnd() {
    if (this.state.isAutoplay) {
      const songId = this.state.currentSong._id;
      const songIds = this.state.currentPlaylist.songs.map(song => song._id);
      const currentPlaylist = this.state.currentPlaylist;
      if (songIds.indexOf(songId) + 1 < currentPlaylist.songs.length) {
        this.setState({
          currentSong: currentPlaylist.songs[songIds.indexOf(songId) + 1]
        });
      }
    }
  }

  onAutoplayClick() {
    this.setState({ isAutoplay: !this.state.isAutoplay });
  }

  render() {
    return (
      <div>
        <h1>hotTUNEZ</h1>
        <SongStatus song={this.state.currentSong} />
        <AudioPlayer
          song={this.state.currentSong}
          onSongEnd={this.onSongEnd} />
        <Playlists
          onPlayClick={this.onSongClick}
          onRemoveClick={this.onRemoveClick}
          onPlaylistClick={this.onPlaylistClick}
          onSaveClick={this.onSaveClick}
          onDeleteClick={this.onDeleteClick}
          onPlaylistAdd={this.onPlaylistAdd}
          onAutoplayClick={this.onAutoplayClick}
          playlists={this.state.playlists}
          currentPlaylist={this.state.currentPlaylist}
          isPlaylistSaved={this.state.isPlaylistSaved}
          isAutoplay={this.state.isAutoplay}
          currentSong={this.state.currentSong}>
          Playlists
        </Playlists>
        <SongList
          onPlayClick={this.onSongClick}
          onAddClick={this.onAddClick}
          songs={this.state.songs}>
          Library
        </SongList>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
