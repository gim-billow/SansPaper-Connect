import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import ItemWrapper from '../ItemWrapper';
import { split, pipe, map } from 'ramda';
import styles from './styles';

const Select = (props) => {
  const [option, selectOption] = React.useState([]);
  const {item} = props;
  const seloptions = pipe(
    split('|'),
    map((opt) => {
      const optArr = split(':', opt);
      return {id: optArr[0], name: optArr[1]};
    }),
  )(item.seloptions);

  const {
    container,
    listContainer,
    selectToggle,
    selectedItem,
    button,
  } = styles;
  return (
    <ItemWrapper>
      <SectionedMultiSelect
        styles={{
          container,
          listContainer,
          selectToggle,
          selectedItem,
          button,
        }}
        items={seloptions}
        IconRenderer={Icon}
        uniqueKey={item.id}
        selectText="Select from options"
        onSelectedItemsChange={() => console.log('onSelectedItemsChange')}
        selectedItems={option}
      />
    </ItemWrapper>
  );
};

export default Select;
