import {StyleSheet, Platform} from 'react-native';
import {backgroundColor, white, darkGrey, red} from '@styles/colors';
import {spaceRegular, spaceSmall, spaceMedium, superSmall} from '@styles/space';
import {regular, medium, small, large, questrial} from '@styles/font';

export default StyleSheet.create({
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: white,
  },
  scrollView: {
    flex: 1,
  },
  newsContainer: {
    backgroundColor: white,
    marginBottom: spaceRegular,
    borderRadius: 10,
  },
  latestNews: {
    alignSelf: 'flex-start',
    marginHorizontal: spaceRegular,
    marginTop: spaceRegular,
    backgroundColor: red,
    borderRadius: 5,
  },
  newsText: {
    color: white,
    padding: superSmall,
    fontSize: small,
  },
  header: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginTop: spaceRegular,
    // marginBottom: spaceMedium,
    backgroundColor: red,
    height: 170,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  headerText: {
    fontSize: large,
    color: white,
    fontFamily: questrial,
    letterSpacing: 0.5,
  },
  divider: {
    marginBottom: spaceSmall,
  },
  showMoreBtn: {
    backgroundColor,
    marginTop: 10,
    // margin: spaceRegular,
    alignSelf: 'flex-start',
    padding: spaceSmall,
    borderRadius: 10,
  },
  showMoreText: {
    color: darkGrey,
    fontFamily: questrial,
  },
  markDownView: {
    paddingVertical: 4,
    margin: 30,
  },

  /**
   * Styles for Markdown
   */
  body: {
    lineHeight: 29,
    // paddingHorizontal: spaceRegular,
    fontFamily: questrial,
    color: darkGrey,
    fontSize: regular,
  },
  bullet_list_icon: {
    ...Platform.select({
      android: {
        fontSize: 25,
        marginTop: 5,
      },
      ios: {
        fontSize: 40,
        marginTop: 5,
      },
      default: {
        fontSize: 40,
        marginTop: 9,
      },
    }),
  },
  text: {
    letterSpacing: 0.2,
  },
  link: {
    color: red,
    textDecorationLine: 'underline',
  },
});
