import React, { Component } from 'react';
import SongListEntry from './song-list-entry';

class SongList extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      query: ''
    };
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    const { children, onPlayClick, onAddClick, songs} = this.props;

    return (
      <div>
        <h2>{ children }</h2>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="filter hotness" />
        <table>
          <tbody>
            <tr>
              <th>#</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Title</th>
            </tr>
            { songs.filter(song => {
                const songInfo = [
                  song.artist.toLowerCase(),
                  song.album.toLowerCase(),
                  song.title.toLowerCase()
                ].join(' ');
                const queries = this.state.query
                  .toLowerCase()
                  .split(' ')
                  .map(query => query.trim());
                for (var i = 0; i < queries.length; i++) {
                  if (songInfo.indexOf(queries[i]) === -1) {
                    return false;
                  }
                }
                return true;
              }).map((song, i) => {
                  return (
                    <SongListEntry
                      key={song._id}
                      onPlayClick={onPlayClick}
                      onAddClick={onAddClick}
                      num={i + 1}
                      song={song} />
                  );
                })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default SongList;
