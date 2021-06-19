import React from 'react';

//types
import ListAccordian from '@components/ListAccordian';

const Project = (props) => {
  const {linkedItems} = props;
  const linkedItemsArr = JSON.parse(linkedItems[0].items);

  return (
    <>
      <ListAccordian data={linkedItemsArr} title="Projects:" />
    </>
  );
};

export default Project;
