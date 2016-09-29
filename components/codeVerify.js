import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import styles from '../utils/styles'

export default class CodeVerify extends Component {
  constructor(props) {
    super(props)
    this.state = { code: '' };
  }
  verifyCode = () => {
    dismissKeyboard()
    Actions.profileinfo({ phoneNumber: this.props.phoneNumber, otp: this.props.otp })
 /* const phoneNumber = this.state.phoneNumber
    const phoneError = validatePhoneNumber(phoneNumber)
    if(!phoneError) {
      Alert.alert(
        'We will be verifying the phone number: +91 ' + this.state.phoneNumber,
        'Is this OK, or would you like to edit the number?',
        [
          {text: 'EDIT', onPress: () => {Actions.verifyphone();this.refs['1'].focus();}},
          {text: 'OK', onPress: () => Actions.codeverify()},
        ]
      )  
    }
    else {
      Alert.alert(
        '',
        'The phone number you entered is too short',
        [
          {text: 'OK', onPress: () => {Actions.verifyphone();this.refs['1'].focus();}},
        ]
      )
  }*/ }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please enter your 4 digit verification code</Text>
        <TextInput
          ref="1"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 60, alignSelf: 'center' }}
          onChange={(code) => this.setState({ code })}
          placeholder=""
          value={this.state.code}
          keyboardType="numeric"
          maxLength={6}
          returnKeyType="done"
        />
        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.verifyCode}
          style={[styles.loginbutton, { alignSelf: 'center' }]}
        >
          <Text style={styles.signin}>
            Next
          </Text>
        </TouchableHighlight>

      </View>
    )
  }
}
