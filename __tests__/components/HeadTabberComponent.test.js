import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import HeadTabberComponent from '../../src/components/HeadTabberComponent';


describe('HeadTabberComponent', () => {
  let component;
  let instance;
  let sandbox;
  let props;
  let onTabClickSpy;
  let setStateSpy;

  beforeEach(() => {
    props = {
      initialActiveTab: 1,
      headers: ['A', 'B', 'C'],
      contents: ['AA', 'BB', 'CC']
    };
    sandbox = sinon.sandbox.create();
    component =  shallow(<HeadTabberComponent {...props} />);
    onTabClickSpy = sandbox.spy(HeadTabberComponent.prototype, '_onTabClick');
    setStateSpy = sandbox.spy(HeadTabberComponent.prototype, 'setState');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('render', () => {
    it('should render into the document', () => {
      expect(component).to.not.equal(null);
    });

    it('should render container', () => {
      expect(component.find('.headtabbercomponent-headercontainer')).to.have.length(1);
    });

    it('should render correct headings', () => {
      expect(component.find('.headtabbercomponent-heading')).to.have.length(3);
    });

    it('should render body', () => {
      expect(component.find('.headtabbercomponent-contents')).to.have.length(1);
      expect(component.find('.headtabbercomponent-contents').text()).to.equal('BB');
    });

    it('should set correct state', () => {
      expect(component.state()).to.eql({
        activeTab: 1
      });
    });

    it('should call onTabClick function when a tab is clicked', () => {
      component.find('.headtabbercomponent-heading').at(0).simulate('click');
      expect(onTabClickSpy).to.be.calledOnce;
      expect(onTabClickSpy.calledWith(0)).to.equal(true);
    });
  });

  describe('instance methods', () => {
    describe('_onTabClick', () => {
      beforeEach(() => {
        instance = component.instance();
      });

      it('should set correct state', () => {
        instance._onTabClick(2);
        expect(component.state()).to.eql({
          activeTab: 2
        });
      });

      it('should not call set state if index has not changed', () => {
        instance._onTabClick(2);
        expect(setStateSpy).to.not.be.called;
      });
    });
  });

  describe('edge cases', () => {

    it('should set correct state for negative initial tab', () => {
      props.initialActiveTab = -5;
      component = shallow(<HeadTabberComponent />);
      expect(component.state()).to.eql({
        activeTab: 0
      });
    });

    it('should set correct state for initial active tab higher than content', () => {
      props.initialActiveTab = 5;
      component = shallow(<HeadTabberComponent />);
      expect(component.state()).to.eql({
        activeTab: 0
      });
    });

    it('should return empty div if headers are empty', () => {
      props.headers = [];
      component = shallow(<HeadTabberComponent />);
      expect(component.find('.headtabbercomponent-headercontainer')).to.have.length(0);
    });

    it('should not render body if corresponding contents for a header are not found', () => {
      props.headers=["A"];
      props.contents = [];
      component = shallow(<HeadTabberComponent />);
      expect(component.find('.headtabbercomponent-contents')).to.have.length(0);
    });
  });
});
