import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import {regExpQuote, regExpDoubleQuote} from '@util/regexp';
import {getOptions} from '@api/upvise/util';
import ItemWrapper from '../../ItemWrapper';

const QueryOptions = (props) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    (async () => {
      const queryArr = props.seloptions.split(',');
      const table = regExpQuote.exec(queryArr[0])[1];
      const query = regExpDoubleQuote.exec(queryArr[1])[1];
      const queriedOptions = await getOptions(table, query, props.organization);
      let formattedData = _mapJSONToPickerItem(queriedOptions.data.items);
      setOptions(formattedData);
    })();
  }, [props.seloptions, props.organization]);

  const _mapJSONToPickerItem = (arr) => {
    return arr.map((val) => {
      return {
        id: val.id,
        name: val.name,
      };
    });
  };

  const onSelectedItemsChange = (selectedItems) => {
    const {rank, updateFieldsValue} = props;
    setSelected(selectedItems);
    updateFieldsValue({rank: rank, value: selectedItems[0]});
  };

  return (
    <ItemWrapper>
      <SectionedMultiSelect
        styles={{...props.styles}}
        items={options}
        IconRenderer={Icon}
        uniqueKey="name"
        single
        selectText="Select from options"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selected}
      />
    </ItemWrapper>
  );
};

export default QueryOptions;
