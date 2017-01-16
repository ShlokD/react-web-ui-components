import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import App from '../../src/containers/App';

describe('App', () => {
  let component;
  beforeEach(() => {
    component = shallow(<App />);
  });

  it('should render into the document', () => {
    expect(component).to.not.equal(null);
  });

  it('should render an example for progress bar', () => {
    expect(component.find("ProgressBarComponent").length).to.equal(1);
  });
});
