import {StyleSheet, Platform} from 'react-native';
import {backgroundColor, white, darkGrey, red, lightGrey} from '@styles/colors';
import {spaceRegular, spaceSmall, spaceMedium} from '@styles/space';
import {regular, medium, small, large} from '@styles/font';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor,
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
    marginHorizontal: spaceRegular,
    marginTop: spaceRegular,
    backgroundColor: red,
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spaceRegular,
    marginBottom: spaceMedium,
  },
  headerText: {
    fontSize: medium,
    fontWeight: 'bold',
    color: darkGrey,
  },
  newsText: {
    padding: spaceSmall,
    color: white,
    fontSize: regular,
  },
  divider: {
    marginBottom: spaceSmall,
  },
  showMoreBtn: {
    backgroundColor,
    margin: spaceRegular,
    alignSelf: 'flex-start',
    padding: spaceSmall,
    borderRadius: 10,
  },
  showMoreText: {
    color: darkGrey,
  },

  /**
   * Styles for Markdown
   */
  body: {
    lineHeight: 29,
    paddingHorizontal: spaceRegular,
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
