import React, { Component } from 'react';
import NavBar from './components/NavBar'
import EventList from './components/EventList'

class App extends Component {
  render() {
    return (
      <div style={{backgroundColor: "#808080"}}>
        <NavBar />
        <EventList />
      </div>
    );
  }
}

export default App;
