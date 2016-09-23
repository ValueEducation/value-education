'use strict';

import {
  StyleSheet,
  Dimensions,
} from 'react-native'

const { height, width } = Dimensions.get('window')
let styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'green',
  },
  navBarTitle: {
    color: '#FFFFFF',
  },
  barButtonTextStyle: {
    color: '#FFFFFF',
  },
  barButtonIconStyle: {
    tintColor: 'rgb(255,255,255)',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 80,
  },
  loginbutton: {
    backgroundColor: 'green',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'green',
    width: 100,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },
  signin: {
    fontSize: 18,
    color: '#FFF',
    margin: 4,
  },
  registertext: {
    fontSize: 12,
    color: '#000',
  },
  registerbuttontext: {
    fontSize: 12,
    color: 'blue',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
  registerbutton: {
    marginTop: -17,
    marginLeft: 90,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container3: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'green',
    width: width - 130,
   // height: Dimensions.get('window').height*0.6,
    padding:6,
  },
  textColor: {
    color: '#000',
  },
  text: {
    color: '#000',
    alignSelf: 'center',
  },
  box: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'green',
    width: Dimensions.get('window').height*0.15,
    height: Dimensions.get('window').height*0.15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  logo: {
    width: 28,
    height: 28,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 200,
    left: 10,
    bottom: 10,
    right: 10,
  },
  welcomeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    color: '#000',
    marginTop: 20,
  },
  contentImage: {
    width: 300,
    height: 250,
    marginTop: 30,
  },
  button: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'green',
    padding: 5,
  },
})

export default styles
