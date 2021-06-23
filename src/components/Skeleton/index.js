import React from 'react';
import {View, ScrollView} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';

import {veryLightGrey} from '@styles/colors';

function MyLoader(props) {
  return (
    <View style={{marginBottom: 30}}>
      <ContentLoader
        speed={3}
        width={340}
        height={84}
        viewBox="0 0 340 84"
        backgroundColor="#f3f3f3"
        foregroundColor={veryLightGrey}
        {...props}>
        <Rect x="0" y="0" rx="3" ry="3" width="67" height="11" />
        <Rect x="76" y="0" rx="3" ry="3" width="140" height="11" />
        <Rect x="127" y="48" rx="3" ry="3" width="53" height="11" />
        <Rect x="187" y="48" rx="3" ry="3" width="72" height="11" />
        <Rect x="18" y="48" rx="3" ry="3" width="100" height="11" />
        <Rect x="0" y="71" rx="3" ry="3" width="37" height="11" />
        <Rect x="18" y="23" rx="3" ry="3" width="140" height="11" />
        <Rect x="166" y="23" rx="3" ry="3" width="173" height="11" />
      </ContentLoader>
    </View>
  );
}

function FormLoader() {
  return (
    <ScrollView contentContainerStyle={{marginTop: 30, marginHorizontal: 20}}>
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
    </ScrollView>
  );
}

export default FormLoader;
