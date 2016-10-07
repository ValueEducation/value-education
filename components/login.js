import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  AsyncStorage,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import http from '../utils/http'
import { validateEmail, validatePassword } from '../utils/validations'
import styles from '../utils/styles'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'test@ggktech.com',
      password: 'Welcome@1234',
      emailError: 'error',
      passwordError: 'error',
    }
  }
  SignIn = () => {
    dismissKeyboard()
    const emailError = this.state.emailError
    const passwordError = this.state.passwordError
    if (!emailError && !passwordError) {
      let data = {
        "email": this.state.email,
        "password" : this.state.password
      }
      http('login',data)
      .then((response) => {
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
  Register = () => {
    Actions.register()
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
  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          ref="1"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          autoFocus={true}
          onChange={this.emailOnChange}
          placeholder="email"
          value={this.state.email}
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => this.focusNextField('2')}
        />
        <TextInput
          ref="2"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          autoFocus={true}
          onChange={this.passwordOnChange}
          placeholder="password"
          value={this.state.password}
          secureTextEntry={true}
          returnKeyType="next"
        />
        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.SignIn}
          style={styles.loginbutton}
        >
          <Text style={styles.signin}>
            Login
          </Text>
        </TouchableHighlight>

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
    )
  }
}
