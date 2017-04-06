import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import TextAreaSummarizer from '../../src/components/TextAreaSummarizerComponent';


describe('HeadTabberComponent', () => {
  let component;
  let instance;
  let sandbox;
  let props;
  let onTextChangeSpy;
  let setStateSpy;

  beforeEach(() => {
    props = {
      rows: 10,
      cols: 100
    };
    sandbox = sinon.sandbox.create();
    component =  shallow(<TextAreaSummarizer {...props} />);
    onTextChangeSpy = sandbox.spy(TextAreaSummarizer.prototype, '_onTextChange');
    setStateSpy = sandbox.spy(TextAreaSummarizer.prototype, 'setState');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('render', () => {
    it('should render into the document', () => {
      expect(component).to.not.equal(null);
    });

    it('should render container', () => {
      expect(component.find('.textarea-summary-container')).to.have.length(1);
    });

    it('should render text area', () => {
      expect(component.find('.text-input-area')).to.have.length(1);
      expect(component.find('.text-input-area').type()).to.equal('textarea');
    });

    it('should render word count', () => {
      expect(component.find('.text-word-count')).to.have.length(1);
      expect(component.find('.text-word-count').text()).to.equal('Words: 0');
    });

    it('should set correct state', () => {
      expect(component.state()).to.eql({
        wordCount: 0
      });
    });

    it('should call onTextChange function when a tab is clicked', () => {
      component.find('.text-input-area').simulate('keydown', {which: 'a'});
      expect(onTextChangeSpy).to.be.calledOnce;
    });
  });

  describe('instance methods', () => {
    beforeEach(() => {
      instance = component.instance();
    });
    describe('_onTextChange', () => {
      it('should correctly set state', () => {
        instance._onTextChange('Hello World');
        expect(setStateSpy).to.be.calledOnce;
        expect(instance.state).to.eql({
          wordCount: 2
        });
      });
    });
  });
});
