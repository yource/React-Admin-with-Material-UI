import React from 'react';

class pageFrame extends React.Component {
  render() {
    return (
      <iframe name="mainFrame" title="mainFrame" id="mainFrame" src={this.props.location.pathname + ".html"}></iframe>
    )
  }
}

export default pageFrame;