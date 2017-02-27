import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const List = ({ items }) => (
  <ListGroup>
    {items.map((value, index) => {
      return (
        <ListGroupItem key={`item-${index}`}>
          <ReactMarkdown
            source={value}
            escapeHtml={true}
            softBreak={'br'}
            disallowedTypes={['Link']}
          />
        </ListGroupItem>
      );
    })}
  </ListGroup>
);

export default List;
