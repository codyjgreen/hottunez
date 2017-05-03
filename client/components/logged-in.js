import React, { Component } from 'react';

class LoggedIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null
    };
  }

  componentDidMount() {
    this.props.lock.getProfile(this.props.idToken, (err, profile) => {
      if (err) {
        console.log('Error loading the profile', err);
        return;
      }
      this.setState({ profile });
    });
  }

  onLogoutClick() {
    localStorage.removeItem('id_token');
  }

  render() {
    if (this.state.profile) {
      return (
        <div>
          <h2>Welcome {this.state.profile.nickname}</h2>
          <a href="/" onClick={this.onLogoutClick}>Logout</a>
        </div>
      );
    } else {
      return (
        <div>Loading profile</div>
      );
    }
  }
}

export default LoggedIn;
