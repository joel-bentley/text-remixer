import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { Button, Col, Panel } from 'react-bootstrap';
import shuffle from 'lodash/shuffle';

import './App.css';

import SortableList from './SortableList';
import List from './List';
import ResponsiveSidebar from './ResponsiveSidebar';

// import textData from './data/sample-data';
import textData from './data/woyzeck.json';

class App extends Component {
  state = {
    sectionOrder: Array.from(textData.sections, (v, i) => i),
    sidebarDocked: false,
    sidebarOpen: false,
  };

  updateSidebarDocked = sidebarDocked => {
    this.setState({ sidebarDocked });
  };

  updateSidebarOpen = sidebarOpen => {
    this.setState({ sidebarOpen });
  };

  toggleSidebarOpen = ev => {
    if (ev) {
      ev.preventDefault();
    }
    this.setState(prevState => ({ sidebarOpen: !prevState.sidebarOpen }));
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { sectionOrder } = this.state;
    this.setState({
      sectionOrder: arrayMove(sectionOrder, oldIndex, newIndex),
    });
  };

  randomizeList = () => {
    this.setState(prevState => {
      return {
        sectionOrder: shuffle(prevState.sectionOrder),
      };
    });
  };

  resetList = () => {
    this.setState({ sectionOrder: Array.from(textData.sections, (v, i) => i) });
  };

  render() {
    const orderedTextData = this.state.sectionOrder.map(
      sectionId =>
        textData.sections.filter(section => section.id === sectionId)[0]
    );
    const titles = orderedTextData.map(section => section.title);
    const texts = orderedTextData.map(section => {
      return `### ${section.title}\n\n${section.text.german}`;
    });

    const sidebarContent = (
      <div className="sidebar-area">

        <Panel className="sidebar-text-panel">
          <div className="text-center">
            <div className="sidebar-button">
              <Button bsStyle="primary" onClick={this.randomizeList}>
                Randomize order
              </Button>
            </div>

            <div className="sidebar-button">
              <Button bsStyle="primary" onClick={this.resetList}>
                Reset to original
              </Button>
            </div>
          </div>
        </Panel>

        <Panel className="sidebar-text-panel">
          <h4 className="text-center">
            You can also remix this text by dragging sections below to new positions
          </h4>
        </Panel>

        <div className="sortable-list">
          <SortableList items={titles} onSortEnd={this.onSortEnd} />
        </div>
      </div>
    );
    return (
      <ResponsiveSidebar
        sidebarContent={sidebarContent}
        sidebarDocked={this.state.sidebarDocked}
        updateSidebarDocked={this.updateSidebarDocked}
        sidebarOpen={this.state.sidebarOpen}
        updateSidebarOpen={this.updateSidebarOpen}
      >
        <div className="App">
          <h1 className="text-center">{textData.title}</h1>
          {!this.state.sidebarDocked &&
            <div className="toggle-sidebar">
              <Button onClick={this.toggleSidebarOpen}>
                <div>☰</div>
              </Button>
            </div>}
          <div className="main-text">
            <Col sm={10} smOffset={1}>
              <List items={texts} />
            </Col>
          </div>
        </div>
      </ResponsiveSidebar>
    );
  }
}

export default App;
