import React, { Component } from 'react';

class CreatePlaylist extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      value: ''
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value.trim().length !== 0) {
      this.props.onPlaylistAdd(this.state.value.trim());
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Add a playlist:
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.value}
            placeholder="name" />
          <button>Add</button>
        </label>
      </form>
    );
  }
}

export default CreatePlaylist;
