import React from 'react';
import {List} from 'react-native-paper';
import {Text} from 'react-native';

//types
import ItemWrapper from '../ItemWrapper';
import styles from './styles';
import {borderStyle, colorStyle} from 'styles/common';
import {useSelector} from 'react-redux';
import {selectUserList} from '@selector/sanspaper';

const User = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [title, setTitle] = React.useState('Please select');
  const users = useSelector(selectUserList);
  const handlePress = () => setExpanded(!expanded);

  const {item, updateFieldsValue} = props;

  const onPress = (selectedItem) => {
    const {id, name} = selectedItem;
    const {rank} = item;
    setTitle(name);
    updateFieldsValue({rank: rank, value: id});
    setExpanded(!expanded);
  };

  return (
    <ItemWrapper>
      <List.Accordion
        title={title}
        left={() => <Text style={styles.text}>{item.label}: </Text>}
        expanded={expanded}
        style={[styles.container, expanded ? borderStyle.borderBottom : null]}
        titleStyle={[expanded ? colorStyle.darkRed : colorStyle.black]}
        onPress={handlePress}>
        {users.map((i, index) => (
          <List.Item
            left={() => <Text style={styles.text}>{index + 1}. </Text>}
            title={i.name}
            key={index}
            onPress={() => onPress(i)}
          />
        ))}
      </List.Accordion>
    </ItemWrapper>
  );
};

export default User;
