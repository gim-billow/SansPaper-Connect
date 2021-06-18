import {StyleSheet} from 'react-native';
import {spaceMedium} from 'styles/space';
import {regular, questrial, medium} from 'styles/font';
import {red, white} from '@styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    backgroundColor: red,
    height: 170,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  name: {
    paddingTop: 10,
    fontSize: medium,
    letterSpacing: 1,
    color: white,
    fontFamily: questrial,
  },
  subText: {
    textAlign: 'center',
    color: white,
    fontSize: regular,
    fontFamily: questrial,
    marginHorizontal: spaceMedium,
  },
  listContainer: {
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  list: {
    paddingVertical: 20,
  },
  listIcon: {
    alignSelf: 'center',
    marginRight: 10,
  },
  title: {
    fontFamily: questrial,
    letterSpacing: 0.2,
    color: '#000',
  },
  description: {
    fontFamily: questrial,
    letterSpacing: 0.2,
    paddingTop: 3,
  },
  updateText: {
    fontFamily: questrial,
    paddingVertical: 3,
    color: 'gray',
    fontSize: 10,
  },
  updateVersion: {
    color: 'green',
    fontFamily: questrial,
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
  profileLogo: {
    width: 75,
    height: 75,
  },
});
