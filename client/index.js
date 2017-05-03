import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AudioPlayer from './components/audio-player';
import Playlists from './components/playlists';
import SongList from './components/song-list';
import SongStatus from './components/song-status';
import Login from './components/login';
import LoggedIn from './components/logged-in';
import Auth0 from '../config/auth';

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
    this.onShuffleClick = this.onShuffleClick.bind(this);

    this.state = {
      songs: [],
      currentSong: {},
      playlists: [],
      currentPlaylist: {songs: []},
      isPlaylistSaved: true,
      isAutoplay: true,
      isShuffle: false
    };
  }

  componentWillMount() {
    this.lock = new Auth0Lock(Auth0.CLIENT_ID, Auth0.CLIENT_DOMAIN);
    this.setState({idToken: this.getIdToken()});
  }

  getIdToken() {
    var idToken = localStorage.getItem('id_token');
    var authHash = this.lock.parseHash(window.location.hash);

    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('id_token', authHash.id_token);
      }
      if (authHash.error) {
        console.log('Error signing in', authHash);
      }
    }
    return idToken;
  }

  setFetchOptions(method) {
    return {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      },
      method: method,
      cache: false
    }
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
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
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
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      }
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
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
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
      if (!this.state.isShuffle) {
        if (songIds.indexOf(songId) + 1 < currentPlaylist.songs.length) {
          this.setState({
            currentSong: currentPlaylist.songs[songIds.indexOf(songId) + 1]
          });
        }
      } else {
        let randomIndex = Math.floor(Math.random() * currentPlaylist.songs.length);
        while (songIds.indexOf(songId) === randomIndex) {
          randomIndex = Math.floor(Math.random() * currentPlaylist.songs.length);
        }
        this.setState({
          currentSong: currentPlaylist.songs[randomIndex]
        });
      }
    }
  }

  onAutoplayClick() {
    this.setState({ isAutoplay: !this.state.isAutoplay });
  }

  onShuffleClick() {
    this.setState({ isShuffle: !this.state.isShuffle });
  }

  render() {
    return (
      <div>
        { (this.state.idToken)
          ? <LoggedIn lock={this.lock} idToken={this.state.idToken} />
        : <Login lock={this.lock} />
        }
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
          onShuffleClick={this.onShuffleClick}
          playlists={this.state.playlists}
          currentPlaylist={this.state.currentPlaylist}
          isPlaylistSaved={this.state.isPlaylistSaved}
          isAutoplay={this.state.isAutoplay}
          isShuffle={this.state.isShuffle}
          isLoggedIn={this.state.idToken}
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
