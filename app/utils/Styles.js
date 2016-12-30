import {
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native'
import Colors from './Colors'

let fontFamily = Platform.OS == 'ios' ? 'helvetica neue' : 'roboto'

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Colors.navBar,
  },

  navBarTitle: {
    color: Colors.white,
    fontWeight: 'bold',
    fontFamily: fontFamily,
    width: Platform.OS == 'ios' ? 300 : null,
  },

  welcomeView: {
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginBottom: 40,
  },

  barButtonTextStyle: {
    color: Colors.black,
  },

  barButtonIconStyle: {
    tintColor: Colors.white,
  },

  container: {
    flex: 1,
    paddingTop: 65,
    paddingHorizontal: 20,
    backgroundColor: Colors.container,
    paddingBottom: 40,
  },

  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },

  carouselContainer: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 40,
    justifyContent:'center',
    alignItems: 'center',
    width: Platform.OS == 'ios' ? Dimensions.get('window').width - 80 : null,
    height: Platform.OS == 'ios' ? 40 : null,
  },

  emoji: {
    fontSize: 30,
    color: '#000',
  },

  autogrowInput: {
    height: 100,
    borderColor: Colors.navBar,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
  },

  thought: {
    backgroundColor: Colors.thought,
    transform: [{ rotate: '270deg' }],
    height: 20,
    marginTop: 50,
    width: Platform.OS == 'ios' ? 140 : 160,
    marginLeft: Platform.OS == 'ios' ? -70 : -80,
    marginRight: Platform.OS == 'ios' ? -50 : -60,
  },

  listItem: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'center',
  },

  listContent: {
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 5,
  },

  tabContent: {
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: 'white',
    padding: 10,
    marginBottom: 10,
  },

  /* titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor:Colors.white,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 25,
    backgroundColor: Colors.white,
  }, */

  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  settingsContainer: {
    borderRadius: 5,
    borderColor: Colors.white,
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 15,
    marginVertical: 10,
  },

  modalStyle: {
    backgroundColor: Colors.lightBlack,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  innerModal: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 1,
    borderWidth: 10,
    borderColor: Colors.white,
  },

  errorText: {
    color: 'red',
    lineHeight: 25,
    fontFamily: fontFamily,
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'center',
  },

  textInput: {
    borderBottomColor: Platform.OS == 'ios' ? Colors.navBar : 'transparent',
    borderBottomWidth: 1,
  },

  loginbutton: {
    backgroundColor: Colors.button,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: Colors.button,
    width: 110,
    marginTop: 20,
    alignItems: 'center',
    padding: 5,
  },

  footer: {
    backgroundColor: Colors.footer,
    height: 30,
    padding: 5,
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
  },

  title: {
    color: Colors.black,
    lineHeight: 25,
    fontFamily: fontFamily,
    fontSize: 16,
  },
  date: {
    color: Colors.black,
    lineHeight: 25,
    fontFamily: fontFamily,
    fontSize: 12,
  },

  contentPic: {
    height: 50,
    width: 50,
    borderColor: Colors.navBar,
    borderWidth: 0.5,
    borderRadius: 25,
  },

  track: {
    height: 2,
    // backgroundColor: '#303030',
  },
  thumb: {
    width: 18,
    height: 18,
    backgroundColor: Colors.thought,
    borderRadius: 9,
    shadowColor: Colors.thought,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 1,
  },

  imageSize: {
    height: 200,
    borderColor: Colors.navBar,
    borderWidth: 0.5,
    resizeMode: 'contain',
  },

  alertsText: {
    color: Colors.black,
    lineHeight: 25,
    fontFamily: fontFamily,
    fontSize: 16,
    marginLeft: 20,
  },

  phoneNumber: {
    height: 40,
    marginTop: 20,
  },
  switch: {
    marginTop: -23,
    marginRight: 20,
    alignSelf: 'flex-end',
  },

  profileIcon: {
    height: 70,
    width: 70,
    borderColor: Colors.navBar,
    borderWidth: 0.5,
    borderRadius: 35,
    marginTop: 10,
  },

  signin: {
    fontSize: 18,
    color: Colors.white,
    margin: 4,
    fontFamily: fontFamily,
  },

  registertext: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: fontFamily,
  },

  textColor: {
    color: Colors.black,
    lineHeight: 25,
    fontFamily: fontFamily,
    fontSize: 16,
  },

  homeNavBar: {
    height: Platform.OS === 'ios' ? 64 : 54,
    backgroundColor: Colors.navBar,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    width: 28,
    height: 28,
    marginTop: 4,
  },

  welcome: {
    fontSize: 20,
    color: Colors.black,
    marginTop: 20,
    fontFamily: fontFamily,
  },

  contentImage: {
    width: 300,
    height: 250,
    marginTop: 30,
  },

  button: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.navBar,
    padding: 5,
  },
})

export default styles
