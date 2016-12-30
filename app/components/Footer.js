import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import styles from '../utils/Styles'
import Colors from '../utils/Colors'

export default class Footer extends Component { 
  render() {
    return (
      <View style={styles.footer}>
        <Text style={[styles.textColor, { color: Colors.navBar, alignSelf: 'flex-end' }]}>
          Powered by :
          <Text style={{ color: Colors.blue, fontSize: 18 }}> ggk </Text>
          <Text style={{ color: Colors.thought, fontSize: 18 }}>tech</Text>
        </Text>
      </View>
    )
  }
}
