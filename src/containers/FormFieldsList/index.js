//library
import React from 'react';
import {FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {has} from 'ramda';

//component
import Fields from 'components/Fields';

//redux,selector
import {setCurrentForm, updateFormFieldValue} from 'store/forms';
import {selectCurrentFormId, selectCurrentFormFields} from 'selector/form';

//constants
import {fieldsProps} from './helper';

class FormFieldsList extends React.Component {
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
    const {updateFormFieldValue: updateFormFieldValueProps} = this.props;

    if (has(item.type, Fields)) {
      const FormFields = Fields[item.type];
      const FieldElement = React.createElement(FormFields, {
        item: item,
        updateFieldsValue: updateFormFieldValueProps,
        ...fieldsProps[item.type],
      });
      return FieldElement;
    } else {
      return (
        <ListItem
          title={item.label}
          leftIcon={<Icon name="file-text-o" />}
          bottomDivider
          chevron
        />
      );
    }
  };

  render() {
    const {currentFormFields} = this.props;
    console.log('rerender ==>', currentFormFields);
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={currentFormFields}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapState = createStructuredSelector({
  currentFormId: selectCurrentFormId,
  currentFormFields: selectCurrentFormFields,
});

export default connect(mapState, {setCurrentForm, updateFormFieldValue})(
  FormFieldsList,
);
