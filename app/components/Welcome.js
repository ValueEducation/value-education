import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import GoogleAnalytics from 'react-native-google-analytics-bridge'
import SplashScreen from 'react-native-splash-screen'
import styles from '../utils/Styles'
import Colors from '../utils/Colors'
import valueEducationLogo from '../images/ValueEdu.png'
import Footer from './Footer'

GoogleAnalytics.setTrackerId('UA-81365729-4')
GoogleAnalytics.setDispatchInterval(10)
GoogleAnalytics.trackScreenView('Welcome')

export default class Welcome extends Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide()
    }, 500)
  }

  SignIn = () => {
    Actions.verifyphone()
  }
  
  render() {
    return (
      <View style={[styles.container, { paddingTop: 15 }]}>
        <StatusBar
          backgroundColor={Colors.statusBar}
          barStyle="light-content"
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}>
          <View style={styles.welcomeView}>
            <Image
              style={styles.contentImage}
              resizeMode="contain"
              source={valueEducationLogo}
            />
            <Text style={styles.welcome}>
              Welcome
            </Text>
            <TouchableOpacity
              onPress={this.SignIn}
              style={
                [styles.loginbutton,
                  {
                    alignSelf: 'center',
                    width: 150,
                  },
              ]}
            >
              <Text style={styles.signin}>
                Register!
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Footer />
      </View>
    )
  }
}
