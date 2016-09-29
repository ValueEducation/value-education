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
import { validatePhoneNumber } from '../utils/validations'
import http from '../utils/http'

export default class VerifyPhoneNum extends Component {
  constructor(props) {
    super(props); 
    this.state = {phoneNumber:'9440950635',otp:''};
  }
  phoneNumOnChange = (event) => {
    const phoneNumber = event.nativeEvent.text
    this.setState({ phoneNumber})
  }
  verifyPhone = () => {
          Actions.codeverify({phoneNumber:this.state.phoneNumber,otp:'123456'})

    /*let data = {
        "phoneNumber": this.state.phoneNumber
      }
      http('sendotp',data)
      .then((response) => {
        alert(JSON.stringify(response))
        if(response.status){
          this.setState({otp:response.otp})
          Actions.codeverify({phoneNumber:this.state.phoneNumber,otp:this.state.otp})
        }
      })
      .catch((error) => {
        alert(error);
      });*/
  }
  getCode = () => {
    dismissKeyboard()
    const phoneNumber = this.state.phoneNumber
    const phoneError = validatePhoneNumber(phoneNumber)
    if(phoneNumber && !phoneError) {
      Alert.alert(
        'We will be verifying the phone number: +91 ' + this.state.phoneNumber,
        'Is this OK, or would you like to edit the number?',
        [
          {text: 'EDIT', onPress: () => {Actions.verifyphone();this.refs['1'].focus();}},
          {text: 'OK', onPress: this.verifyPhone},
        ]
      ) 
    }
    if(phoneNumber && phoneError) {
      Alert.alert(
        '',
        'The phone number you entered is too short',
        [
          {text: 'OK', onPress: () => {Actions.verifyphone();this.refs['1'].focus();}},
        ]
      )  
    }
    if(!phoneNumber) {
      Alert.alert(
        '',
        'Please enter a valid phone number',
        [
          {text: 'OK', onPress: () => {Actions.verifyphone();this.refs['1'].focus();}},
        ]
      )  
    }
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We will send an SMS message to verify your phone number. Please enter your phone number</Text>
        <TextInput
          ref='1'
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChange={this.phoneNumOnChange}
          placeholder="phone number"
          value={this.state.phoneNumber}
          keyboardType="numeric"
          maxLength={10}
          returnKeyType="done"
        />
        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.getCode}
          style={[styles.loginbutton,{alignSelf: 'center'}]}
        >
          <Text style={styles.signin}>
            Next
          </Text>
        </TouchableHighlight>

      </View>
    )
  }
}
