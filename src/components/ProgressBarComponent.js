import React, { PropTypes } from 'react';
import '../styles/ProgressBarComponent.scss';

export const getStyles = (completed)  =>  {
  return {
    completedStyle: {
      width: `${completed}%`
    },
    leftStyle: {
      width: `${100 - completed}%`
    }
  };
};

class ProgressBarComponent extends React.Component {
  constructor(props) {
    super(props);
    let value =  props.initialValue;
    if(value < 0){
      value = 0;
    }

    if(value >= 100) {
      value = 100;
    }

    this.state = {
      value
    }
  }

  _onIncreaseProgress() {
    if(this.state.value < 100) {
      this.setState({
        value: this.state.value + 1
      })
    }
   }

   _onDecreaseProgress() {
     if(this.state.value > 0) {
       this.setState({
         value: this.state.value - 1
       });
     }
   }


  render() {
    let { value } = this.state;
    const progressBarIndicator = <div className='progressbar-indicator'> {value} </div>

    const { completedStyle, leftStyle} = getStyles(value);
    return (
      <div className='progressbar-component'>
        <div className='progressbar-completed display-inline-block vertical-align-top text-center' style={completedStyle}>
          { value >= 50 && progressBarIndicator}
        </div>
        <div className='progressbar-left display-inline-block vertical-align-top text-center' style={leftStyle}>
          {value < 50 && progressBarIndicator}
        </div>
        <div className='progressbar-increase progressbar-button display-inline-block' onClick={() => this._onIncreaseProgress()}> + </div>
        <div className='progressbar-decrease progressbar-button display-inline-block' onClick={() => this._onDecreaseProgress()}> - </div>
      </div>
    );
  }
}

ProgressBarComponent.displayName = 'ProgressBarComponent';

ProgressBarComponent.propTypes = {
  initialValue: PropTypes.number
};
ProgressBarComponent.defaultProps = {
  initialValue: 0
};

export default ProgressBarComponent;
