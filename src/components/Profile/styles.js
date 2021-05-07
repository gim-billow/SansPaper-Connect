import {StyleSheet} from 'react-native';
import {spaceMedium} from 'styles/space';
import {regular} from 'styles/font';
import {darkGrey} from '@styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  top: {
    paddingVertical: 40,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subText: {
    textAlign: 'center',
    color: darkGrey,
    fontSize: regular,
    marginHorizontal: spaceMedium,
  },
  listContainer: {
    paddingHorizontal: 30,
  },
  list: {
    paddingVertical: 20,
  },
  listIcon: {
    alignSelf: 'center',
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    fontSize: regular,
  },
  updateText: {
    color: 'gray',
    fontSize: 10,
  },
  updateVersion: {
    color: 'green',
  },

  // modal styles
  changePasswordSubContainer: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  passwordTextStyle: {
    color: 'gray',
    marginTop: 10,
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    width: 370,
    height: 445,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  changePasswordText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 30,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: 'red',
    borderRadius: 2,
    fontSize: 16,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 10,
  },
  marginLeftRegular: {
    marginLeft: 70,
  },
  marginLeftSmall: {
    marginLeft: 20,
  },
});
