/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native'
import { Actions } from 'react-native-router-flux'

import styles from '../utils/styles'
import valueEducationLogo from '../images/ValueEdu.jpg'

export default class Welcome extends Component {
  SignIn = () => {
    Actions.login();
  }
  Register = () => {
    Actions.register();
  }
  render() {
    return (
      <View style={styles.welcomeContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={styles.contentImage}
            resizeMode="contain"
            source={valueEducationLogo}
          />
          <Text style={styles.welcome}>
            Welcome
          </Text>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={this.SignIn}
            style={styles.loginbutton}
          >
            <Text style={styles.signin}>
              Sign In
            </Text>
          </TouchableHighlight>
        </View>
        <View style={{ alignSelf: 'center' }}>
          <Text style={styles.registertext}>
            Not a member?
          </Text>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={this.Register}
            style={styles.registerbutton}
          >
            <Text style={styles.registerbuttontext}>
              Register
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
