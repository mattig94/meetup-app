import React, { Component } from 'react';
import { Cell, Legend, PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';

class Event extends Component {
  state = {
    expanded: false,
  }

  onDetailsButtonClicked = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  getData = () => {
    const peopleGoing = this.props.event.yes_rsvp_count;
    const spaceLeft = this.props.event.rsvp_limit - this.props.event.yes_rsvp_count;
    return [
      { name: "People Going", value: peopleGoing },
      { name: "Space Available", value: spaceLeft }
    ];
  }

  render() {
    const event = this.props.event;
    const colors = ['#1d3251', '#95D9B0'];
    return (
      <div className="Event">
        <p className="time">{event.local_time} - {event.local_date}</p>
        <p className="name">{event.name}</p>
        {event.group && event.group.name && <p className="group-name">Group: {event.group.name}</p>}
        <p className="going">{event.yes_rsvp_count} people are going</p>
        {this.state.expanded &&
          <div className="moreInfo">
            {event.rsvp_limit && (
                <ResponsiveContainer height={200}>
                  <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                    <Pie data={this.getData()} dataKey="value"  nameKey="name" cx="10%">
                    {
                      this.getData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]}/>
                      ))
                    }
                    </Pie>
                    <Tooltip />
                    <Legend layout="vertical" align="left" />
                  </PieChart>
                </ResponsiveContainer>
              )}
            {event.venue && event.venue.name &&
              <p className="address">
                {event.venue.name
                  + ', ' + event.venue.address_1
                  + ', ' + event.venue.city
                  + ', ' + event.venue.state
                }
              </p>
            }
            <div className="description" dangerouslySetInnerHTML={{__html: event.description}} />
            <p className="visibility">{event.visibility}</p>
            <a className="link" href={event.link}>Event Link</a>
          </div>
        }
        <button className="detailsButton" onClick={this.onDetailsButtonClicked}>Details</button>
      </div>
    );
  }
}

export default Event;