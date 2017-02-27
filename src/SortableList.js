import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import ReactMarkdown from 'react-markdown';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const SortableItem = SortableElement(({ value }) => (
  <ListGroupItem>
    <ReactMarkdown
      source={value}
      escapeHtml={true}
      softBreak={'br'}
      disallowedTypes={['Image', 'Link']}
    />
  </ListGroupItem>
));

const SortableList = SortableContainer((
  { items }
) => (
  <ListGroup>
    {items.map((value, index) => {
      return (
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={value}
        />
      );
    })}
  </ListGroup>
));

export default SortableList;
