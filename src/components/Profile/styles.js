import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular} from 'styles/space';
import {regular} from 'styles/font';
import {lightRed, darkRed} from '@styles/colors';

export default StyleSheet.create({
  userIcon: {
    color: 'gray',
    paddingTop: 20,
  },
  text: {
    fontSize: regular,
    color: 'gray',
  },
  nametext: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  labeltext: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  updatedtext: {
    fontSize: 10,
    color: 'gray',
  },
  pointstext: {
    fontSize: 10,
    paddingLeft: 120,
    color: 'gray',
  },
  laveltext: {
    fontSize: 10,
  },
  versiontext: {
    fontSize: 12,
    color: 'green',
  },
  textView: {
    paddingLeft: spaceRegular,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  userContainer: {
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderColor: 'gray',
    paddingTop: 20,
    paddingBottom: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 40,
    borderBottomWidth: 0.4,
    borderColor: 'gray',
    height: 90,
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 40,
    height: 90,
    borderBottomWidth: 0.4,
    borderColor: 'gray',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  textInput: {
    borderWidth: 1.5,
    borderColor: 'red',
    borderRadius: 2,
    fontSize: 16,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 10,
  },
  passwordTextStyle: {
    color: 'gray',
    marginTop: 10,
    fontSize: 16,
  },
});
