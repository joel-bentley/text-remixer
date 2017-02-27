import React, { Component } from 'react';
import Sidebar from 'react-sidebar';

class ResponsiveSidebar extends Component {

  componentWillMount() {
    var mql = window.matchMedia(`(min-width: 800px)`);
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql: mql });
    this.props.updateSidebarDocked(mql.matches);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged = () => {
    this.props.updateSidebarDocked(this.state.mql.matches);
  };

  render() {
    return (
      <Sidebar
        sidebar={this.props.sidebarContent}
        open={this.props.sidebarOpen}
        docked={this.props.sidebarDocked}
        onSetOpen={this.props.updateSidebarOpen}
        pullRight
      >
        {this.props.children}
      </Sidebar>
    );
  }
}

export default ResponsiveSidebar;
