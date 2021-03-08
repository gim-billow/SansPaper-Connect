//library
import React from 'react';
import {FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {has} from 'ramda';

//component
import ProfileMenu from 'components/ProfileMenu';

//redux,selector
import {setCurrentForm, updateFormFieldValue} from 'store/forms';
import {selectCurrentFormId, selectCurrentFormFields} from 'selector/form';
import {loginUser} from 'store/user';
import {selectEmail} from 'selector/user';
import {selectUser} from 'selector/sanspaper';
import {selectOrganistation} from 'selector/sanspaper';

//constants
import {fieldsProps} from './helper';

class ProfileList extends React.Component {
  state = {
    expanded: false,
    fieldsValue: {},
  };

  keyExtractor = (item, index) => index.toString();

  onPress = () => {
    const {expanded} = this.state;
    this.setState({expanded: !expanded});
  };

  renderItem = (props) => {
    const {item} = props;
    console.log('profilesE', has(item.type, ProfileMenu));
    if (has(item.type, ProfileMenu)) {
      const FormFields = ProfileMenu[item.type];
      const FieldElement = React.createElement(FormFields, {
        item: item,
        // updateFieldsValue: updatedFormFieldProps,
        // organization,
        // currentFormFields,
        ...fieldsProps[item.type],
      });
      return FieldElement;
    } else {
      return (
        <ListItem
          title={item.userEmail}
          leftIcon={<Icon name="file-text-o" />}
          bottomDivider
          chevron
        />
      );
    }
  };

  render() {
    const {email, user} = this.props;
    const name = user._data.name;
    const dataArray = [
      {type: 'user', userName: name, iamge: 'ok'},
      {type: 'level', points: '278'},
      {type: 'email', email: email},
      {type: 'password'},
      {type: 'setting'},
      {type: 'logout'},
      {type: 'version'},
    ];
    console.log('profiledata:', name);
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={dataArray}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapState = createStructuredSelector({
  email: selectEmail,
  user: selectUser,
});

export default connect(mapState)(ProfileList);
