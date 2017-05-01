import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SongList from './components/song-list';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SongList />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
