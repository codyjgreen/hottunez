import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SongList from './components/song-list';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/songs')
      .then(res => res.json())
      .then(res => this.setState({ songs: res.results }));
  }

  render() {
    return (
      <div>
        <SongList songs={this.state.songs} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
