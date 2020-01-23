import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    number: 32,
  }
  
  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ number: value });
    this.props.updateEvents(null, null, value);
  }

  render() {
    return(
      <div className="NumberOfEvents">
        <p>Show
          <input type="number" className="howManyEvents" onChange={this.handleInputChanged} value={this.state.number} />
          Events
        </p>
      </div>
    );
  }
}

export default NumberOfEvents;