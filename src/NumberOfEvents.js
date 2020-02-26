import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    number: 32,
  }
  
  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ number: value });
    this.props.updateEvents(null, null, value);
    if (value < 1) {
      this.setState({
        errorText: 'Please enter a number greater than 1'
      });
    } else {
      this.setState({
        errorText: ''
      });
    }
  }

  render() {
    return(
      <div className="NumberOfEvents">
        <p>
          <ErrorAlert text={this.state.errorText} />
          Show
          <input type="number" className="howManyEvents" onChange={this.handleInputChanged} value={this.state.number} />
          Events
        </p>
      </div>
    );
  }
}

export default NumberOfEvents;