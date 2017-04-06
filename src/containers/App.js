import React, { Component } from 'react';
import './App.scss';
import '../styles/base.scss';
import ProgressBarComponent from '../components/ProgressBarComponent';
import HeadTabberComponent from '../components/HeadTabberComponent';
import TextAreaSummarizer from '../components/TextAreaSummarizerComponent';
import { headerDemoContents } from '../utils/mockData';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='react-ui-example'>
          <div className='example-heading'> Progress Bar </div>
          <ProgressBarComponent initialValue={72} />
        </div>
        <div className='react-ui-example'>
          <div className='example-heading'> Tabber - Heading</div>
          <HeadTabberComponent
            initialActiveTab={2}
            headers={['Heading-1', 'Heading-2', 'Heading-3']}
            contents={headerDemoContents}
           />
        </div>
        <div className='react-ui-example'>
          <div className='example-heading'>Text area with word counter</div>
          <TextAreaSummarizer
            rows={10}
            cols={100}
           />
        </div>
      </div>
    );
  }
}

export default App;
