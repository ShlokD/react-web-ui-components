import React, { Component, PropTypes } from 'react';
import '../styles/HeadTabberComponent.scss';
import isEmpty from 'lodash/isEmpty';

class HeadTabberComponent extends Component {
  constructor(props) {
    super(props);
    let activeTab = 0;
    if(props.initialActiveTab >= 0 && props.initialActiveTab <= props.headers.length - 1) {
      activeTab = props.initialActiveTab;
    }
    this.state = {
      activeTab
    }
  }

  _onTabClick(index) {
    if(this.state.activeTab !== index) {
      this.setState({
        activeTab: index
      });
    }
  }

  _renderBody() {
    const { activeTab } = this.state;
    const { contents } = this.props;
    if(isEmpty(contents[activeTab])) return <div/>;

    return (
      <div className='headtabbercomponent-contents text-center'>
        {contents[activeTab]}
      </div>
    );
  }


  _renderTabs() {
    const { headers = [] } = this.props;
    if(isEmpty(headers)) return <div/>;
    return (
      <div className='headtabbercomponent-headercontainer'>
      {headers.map((header, index) => {
        return (
          <div
           key={`headtabbercomponent-tab${index}`}
           className='headtabbercomponent-heading display-inline-block'
           onClick={() => this._onTabClick(index)}>
            {header}
          </div>
        );
      })}
      {this._renderBody()}
      </div>
    )

  }

  render() {
    return (
    <div className='headtabber-component display-inline-block'>
      {this._renderTabs()}
    </div>);
  }
}

HeadTabberComponent.displayName = 'HeadTabberComponent';

HeadTabberComponent.propTypes = {
  initialActiveTab: PropTypes.number,
  headers: PropTypes.array,
  contents: PropTypes.array
}

HeadTabberComponent.defaultProps = {
  initialActiveTab: 0,
  headers: [],
  contents: []
};

export default HeadTabberComponent;
