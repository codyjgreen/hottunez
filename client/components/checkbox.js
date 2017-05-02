import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = { checked: this.props.checked };
  }

  handleChange(event) {
    this.setState({ checked: !this.state.checked });
    this.props.handleParentChange();
  }

  render() {
    const { children, style } = this.props;

    return (
      <label className={style}>
        <input
          type="checkbox"
          checked={this.state.checked}
          onChange={this.handleChange} />
        {children}
      </label>
    );
  }
}

export default Checkbox;
