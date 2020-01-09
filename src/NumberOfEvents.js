import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    number: 32,
  }
  
  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ number: value });
  }

  render() {
    return(
      <div className="NumberOfEvents">
        <p>Show
          <input type="number" value={this.state.number} onChange={this.handleInputChanged} />
          Events
        </p>
      </div>
    );
  }
}

export default NumberOfEvents;