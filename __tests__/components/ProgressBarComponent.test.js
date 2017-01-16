import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ProgressBarComponent from '../../src/components/ProgressBarComponent';

describe('ProgressBarComponent', () => {
  let component;
  let instance;
  let sandbox;
  let increaseProgressSpy;
  let decreaseProgressSpy;

  beforeEach(() => {
    component = shallow(<ProgressBarComponent initialValue={55}/>);
    instance = component.instance();
    sandbox = sinon.sandbox.create();
    increaseProgressSpy = sandbox.spy(instance, '_onIncreaseProgress');
    decreaseProgressSpy = sandbox.spy(instance, '_onDecreaseProgress');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render into document', () => {
    expect(component).to.not.equal(null);
  });

  it('should set correct initial state', () => {
    expect(component.state()).to.eql({
      value: 55
    });
  });

  it('should render a progress completed component', () => {
    expect(component.find('.progressbar-completed').length).to.equal(1);
  });

  it('should render a progress left component', () => {
    expect(component.find('.progressbar-left').length).to.equal(1);
  });

  it('should render a progress indicator component', () => {
    expect(component.find('.progressbar-indicator').length).to.equal(1);
    expect(component.find('.progressbar-indicator').text()).to.equal(' 55 ');
  });

  it('should render a button to increase progress', () => {
    const increaseProgressButton = component.find('.progressbar-increase');
    expect(increaseProgressButton.length).to.equal(1);
    increaseProgressButton.simulate('click');
    expect(increaseProgressSpy).to.be.calledOnce;
  });

  it('should render a button to decrease progress', () => {
    const decreaseProgressButton = component.find('.progressbar-decrease');
    expect(decreaseProgressButton.length).to.equal(1);
    decreaseProgressButton.simulate('click');
    expect(decreaseProgressSpy).to.be.calledOnce;
  });

  describe('instance methods', () => {
    it('should set correct state on increase progress', () => {
      instance._onIncreaseProgress();
      expect(component.state()).to.eql({
        value: 56
      });
    });

    it('should set correct state on decrease progress', () => {
      instance._onDecreaseProgress();
      expect(component.state()).to.eql({
        value: 54
      });
    });

    it('should not increase value beyond 100', () => {
      component.setState({
        value: 100
      });
      instance._onIncreaseProgress();
      expect(component.state()).to.eql({
        value: 100
      });
    });

    it('should not decrease value below 0', () => {
      component.setState({
        value: 0
      });
      instance._onDecreaseProgress();
      expect(component.state()).to.eql({
        value: 0
      });
    });
  });

  describe('edge cases', () => {
    it('should set value as 0 for negative initial value', () => {
      component = shallow(<ProgressBarComponent initialValue={-44}/>);
      expect(component.state()).to.eql({
        value: 0
      });
    });

    it('should set value as 100 for over 100 initial value', () => {
      component = shallow(<ProgressBarComponent initialValue={144}/>);
      expect(component.state()).to.eql({
        value: 100
      });
    });
  });
});
