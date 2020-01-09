import React, { Component } from 'react';

class Event extends Component {
  state = {
    detailsOpen: false,
  }
  
  toggleDetails = () => {
    this.setState({ detailsOpen: !this.state.detailsOpen});
  }

  render() {
    return(
      <div className="Event">
        <p className="eventTimeDate"></p>
        <p className="eventName"></p>
        <p className="eventGroup">Group: </p>
        <p className="yesRsvp">{} people are going</p>
        <button className="details" onClick={this.toggleDetails}>Details</button>
        <div className="eventDetails"></div>
      </div>
    );
  }
}

export default Event;