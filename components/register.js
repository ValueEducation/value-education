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
  TextInput,
  Dimensions,
  AsyncStorage,
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import styles from '../utils/styles'
import { validateEmail, validatePassword, validatePhoneNumber } from '../utils/validations'
import http from '../utils/http'
const { height, width } = Dimensions.get('window')

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'GGK Tech',
      email: 'test@ggktech.com',
      password: 'welcome@1234',
      phoneNumber: '9876543210',
      date: '',
      emailError: '',
      passwordError: '',
      phoneError: '',
    }
  }
  Register = () => {
    dismissKeyboard()
    const emailError = this.state.emailError
    const passwordError = this.state.passwordError
    const phoneError = this.state.phoneError
    if (!emailError && !passwordError && !phoneError) {
      let data = {
        "email": this.state.email,
        "password": this.state.password,
        "name": this.state.name,
        "phoneNumber": this.state.phoneNumber,
        "birthDate": new Date()
      }
      http('token',data)
      .then((response) => {
        // alert(JSON.stringify(response))
        if(response.token && response.status){
          AsyncStorage.setItem('token', response.token)
          AsyncStorage.setItem('userId', response.userId)
          Actions.main()       
        }
      })
      .catch((error) => {
        alert(error);
      });
    }
  }
  emailOnChange = (event) => {
    const email = event.nativeEvent.text
    const emailError = validateEmail(email)
    this.setState({ email, emailError })
  }
  passwordOnChange = (event) => {
    const password = event.nativeEvent.text
    const passwordError = validatePassword(password)
    this.setState({ password, passwordError })
  }
  phoneNumOnChange = (event) => {
    const phoneNumber = event.nativeEvent.text
    alert(phoneNumber)
    const phoneError = validatePassword(phoneNumber)
    this.setState({ phoneNumber, phoneError })
  }
  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          ref="1"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(name) => this.setState({ name })}
          placeholder="name"
          value={this.state.name}
          maxLength={25}
          autoFocus={true}
          returnKeyType="next"
          onSubmitEditing={() => this.focusNextField('2')}
        />
        <TextInput
          ref="2"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChange={this.emailOnChange}
          placeholder="email"
          value={this.state.email}
          keyboardType="email-address"
          autoFocus={true}
          returnKeyType="next"
          onSubmitEditing={() => this.focusNextField('3')}
        />
        <TextInput
          ref="3"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChange={this.phoneNumOnChange}
          placeholder="phone number"
          value={this.state.phoneNumber}
          maxLength={10}
          autoFocus={true}
          returnKeyType="next"
          onSubmitEditing={() => this.focusNextField('4')}
        />
        <TextInput
          ref="4"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChange={this.passwordOnChange}
          placeholder="password"
          value={this.state.password}
          secureTextEntry={true}
          autoFocus={true}
          returnKeyType="next"
        />
        <DatePicker
          style={{ width }}
          date={this.state.date}
          mode="datetime"
          placeholder="Date of Birth"
          confirmBtnText="OK"
          cancelBtnText="Cancel"
          showIcon={false}
          autoFocus={true}
          onDateChange={(date) => { this.setState({ date })  }}
        />
        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.Register}
          style={styles.loginbutton}
        >
          <Text style={styles.signin}>
            Register
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}
