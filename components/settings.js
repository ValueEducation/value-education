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
  TouchableHighlight,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import styles from '../utils/styles'

export default class Settings extends Component {
  Notification = () => {
    Actions.notifications()
  }
  Account = () => {
    Actions.account()
  }
  Frequency = () => {
    Actions.frequency()
  }
  ContentType = () => {
    Actions.contenttype()
  }
  AboutUs = () => {
    Actions.aboutus()
  }
  render() {
    return (
      <View style={styles.container}>

        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.Notification}
          style={styles.button}
        >
          <Text style={styles.textColor}>Notification</Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.Account}
          style={styles.button}
        >
          <Text style={styles.textColor}>Account</Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.Frequency}
          style={styles.button}
        >
          <Text style={styles.textColor}>Frequency</Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.ContentType}
          style={styles.button}
        >
          <Text style={styles.textColor}>Content Type</Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.AboutUs}
          style={styles.button}
        >
          <Text style={styles.textColor}>About Us</Text>
        </TouchableHighlight>

      </View>
    )
  }
}
