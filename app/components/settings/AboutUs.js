import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import GoogleAnalytics from 'react-native-google-analytics-bridge'
import styles from '../../utils/Styles'
import Footer from '../Footer'

GoogleAnalytics.setTrackerId('UA-81365729-4')
GoogleAnalytics.setDispatchInterval(10)
GoogleAnalytics.trackScreenView('Aboutus')

export default class Aboutus extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textColor}>Value Education</Text>
        <Footer />
      </View>
    )
  }
}
