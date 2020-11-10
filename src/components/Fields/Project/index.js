import React from 'react';

//types
import ItemWrapper from '../ItemWrapper';
import ListAccordian from '@components/ListAccordian';

const Project = (props) => {
  const {linkedItems} = props;
  const linkedItemsArr = JSON.parse(linkedItems[0].items);

  return (
    <ItemWrapper>
      <ListAccordian data={linkedItemsArr} title="Projects:" />
    </ItemWrapper>
  );
};

export default Project;
