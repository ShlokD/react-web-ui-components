import React, { Component, PropTypes } from 'react';
import '../styles/TextAreaSummarizerComponent.scss';


class TextAreaSummarizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordCount: 0
    };

  }

  _onTextChange(text) {
    const words = text.match(/[\w\d]+/gi).length;
    this.setState({
      wordCount: words
    });
  }

  render() {
    const { rows, cols } = this.props;
    return (
      <div className="textarea-summary-container">
        <textarea className="text-input-area" rows={rows} cols={cols} onChange={(ev) => this._onTextChange(ev.target.value)}/>
        <div className="text-word-count">Words: {this.state.wordCount}</div>
      </div>
    )
  }
};

TextAreaSummarizer.propTypes = {
  rows: PropTypes.number,
  cols: PropTypes.number
};

TextAreaSummarizer.defaultProps = {
  rows: 10,
  cols: 50
}


export default TextAreaSummarizer;
