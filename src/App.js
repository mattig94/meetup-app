import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';
import { WarningAlert } from './Alert';

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

  render() {
    return (
      <div className="App">
        <CitySearch updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <WarningAlert text={this.state.warningText} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
