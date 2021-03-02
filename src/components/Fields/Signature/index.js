import React, {useState, createRef} from 'react';
import {ScrollView, SafeAreaView, View, Text} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import ItemWrapper from '../ItemWrapper';
import styles from './styles';

const Signature = (props) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const ref = createRef();
  const {label, rank} = props.item;
  const {updateFieldsValue} = props;

  const handleSignature = (signature) => {
    const base64url = signature.replace('data:image/png;base64,', '');
    updateFieldsValue({rank: rank, value: base64url});
    console.log(signature);
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  const handleClear = () => {
    updateFieldsValue({rank: rank, value: ''});
    console.log('clear success!');
  };

  const handleEnd = () => {
    ref.current.readSignature();
  };

  return (
    <SafeAreaView>
      <ScrollView scrollEnabled={scrollEnabled}>
        <ItemWrapper>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.container}>
            <View style={styles.signature}>
              <SignatureScreen
                ref={ref}
                onOK={handleSignature}
                onEmpty={handleEmpty}
                onClear={handleClear}
                onBegin={() => setScrollEnabled(false)}
                onEnd={() => setScrollEnabled(true)}
                minWidth={5}
                trimWhitespace={true}
                backgroundColor="rgb(255,255,255)"
                penColor={'rgba(255,117,2,1)'}
                webStyle={`.m-signature-pad--footer
                .button.save {
                  background-color: red;
                  color: #FFF;
                }`}
                // descriptionText={'text'}
              />
            </View>
          </View>
        </ItemWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signature;
