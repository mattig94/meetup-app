import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';
import { WarningAlert } from './Alert';
import moment from 'moment';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class App extends Component {
  state = {
    events: [],
    lat: null,
    lon: null,
    page: null,
  }

  componentDidMount() {
    this.updateEvents();
  }

  updateEvents = (lat, lon, page) => {
    if (!navigator.onLine) {
      this.setState({
        warningText: 'You are offline. Events displayed are from you\'re previous session, so they may be out of date',
      });
    } else {
      this.setState({
        warningText: '',
      });
    }
    if (lat && lon) {
      getEvents(lat, lon, this.state.page).then(events => this.setState({ events, lat, lon }));
    } else if (page) {
      getEvents(this.state.lat, this.state.lon, page).then(events => this.setState({ events, page }));
    } else {
      getEvents(this.state.lat, this.state.lon, this.state.page).then(events => this.setState({ events }));
    }
  }

  countEventsOnADate = (date) => {
    let count = 0;
    for (let i = 0; i < this.state.events.length; i += 1) {
      if (this.state.events[i].local_date === date) {
        count += 1;
      }
    }
    return count;
  }

  getData = () => {
    const next7days = [];
    const currentDate = moment();
    for (let i = 0; i < 7; i += 1) {
      currentDate.add(1, 'days');
      const dateString = currentDate.format('YYYY-MM-DD');
      const count = this.countEventsOnADate(dateString);
      next7days.push({ date: dateString, number: count });
    }
    return next7days;
  }

  render() {
    return (
      <div className="App">
        <h1>Meetup Application</h1>
        <CitySearch updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <WarningAlert text={this.state.warningText} />
        <ResponsiveContainer height={400}>
          <ScatterChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="category" dataKey="date" name="date" />
            <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#95D9B0" />
          </ScatterChart>
        </ResponsiveContainer>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
