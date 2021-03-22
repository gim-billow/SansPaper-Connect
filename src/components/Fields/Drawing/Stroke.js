import React from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';

const Stroke = (props) => {
  return (
    <View>
      <FlatList
        data={props.colors}
        keyExtractor={(item) => item.color.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              styles.functionButton,
              item.active ? styles.selected : null,
              styles.bgColor(item.color),
            ]}
            onPress={() => {
              props.setActiveColor(index);
              props.changeColor(item.color);
            }}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  functionButton: {
    marginHorizontal: 5,
    marginVertical: 8,
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    borderWidth: 1.5,
    borderColor: '#000000',
  },
  bgColor: (color) => ({
    backgroundColor: color,
  }),
});

export default Stroke;
