import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { Button, Col, Panel } from 'react-bootstrap';
import './App.css';
import textData from './data/sample-data';
import SortableList from './SortableList';
import List from './List';
import ResponsiveSidebar from './ResponsiveSidebar';

class App extends Component {
  state = {
    sectionOrder: Array.from(textData.sections, (v, i) => i),
    sidebarDocked: false,
    sidebarOpen: false
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
      sectionOrder: arrayMove(sectionOrder, oldIndex, newIndex)
    });
  };

  render() {
    const orderedTextData = this.state.sectionOrder.map(
      sectionId =>
        textData.sections.filter(section => section.id === sectionId)[0]
    );
    const titles = orderedTextData.map(section => section.title);
    const texts = orderedTextData.map(section => {
      return `### ${section.title}\n\n${section.text}`;
    });

    const sidebarContent = (
      <div className="sidebar-area">
        <h4 className="text-center">
          <Panel className="sidebar-text-panel">
            Remix this text by dragging sections below to new positions
          </Panel>
        </h4>
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
