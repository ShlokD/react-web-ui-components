import React, { Component } from 'react';
import './App.css';
import ProgressBarComponent from "../components/ProgressBarComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="react-ui-example">
          <div className="example-heading"> Progress Bar </div>
          <ProgressBarComponent initialValue={72} />
        </div>
      </div>
    );
  }
}

export default App;
