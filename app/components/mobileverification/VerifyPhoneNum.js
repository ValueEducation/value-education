import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  NetInfo,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import styles from '../../utils/Styles'
import { validatePhoneNumber } from '../../utils/Validations'
import http from '../../utils/Http'
import Colors from '../../utils/Colors'
import Footer from '../Footer'

export default class VerifyPhoneNum extends Component {

  constructor(props) {
    super(props)
    this.state = { phoneNumber: '' }
  }

  getCode = () => {
    dismissKeyboard()
    const phoneNumber = this.state.phoneNumber
    const phoneError = validatePhoneNumber(phoneNumber)
    if (phoneNumber && !phoneError) {
      Alert.alert(
        'We will be verifying the phone number: +91 ' + this.state.phoneNumber,
        'Is this OK, or would you like to edit the number?',
        [
          { text: 'EDIT', onPress: () => { this.refs['1'].focus(); } },
          { text: 'OK', onPress: this.verifyPhone },
        ],
        { cancelable: false }
      )
    }
    if (phoneNumber && phoneError) {
      Alert.alert(
        '',
        'The phone number you entered is too short',
        [
          { text: 'OK', onPress: () => { this.refs['1'].focus(); } },
        ],
        { cancelable: false }
      )
    }
    if (!phoneNumber) {
      Alert.alert(
        '',
        'Please enter a valid phone number',
        [
          { text: 'OK', onPress: () => { this.refs['1'].focus(); } },
        ],
        { cancelable: false }
      )
    }
  }

  verifyPhone = () => {
    NetInfo.fetch().done((reach) => {
      if (reach === 'NONE') {
        alert('No Internet Connection')
      } else {
        const data = {
          phoneNumber: this.state.phoneNumber,
        }
        http('sendotp', data).then((response) => {
          if (response.status) {            
            this.setState({ otp: response.otp })
            // alert(response.isAlreadyRegistered + '' + response.isActive)
            if (response.isAlreadyRegistered && !response.isActive) {
              const phoneNumber = this.state.phoneNumber
              const isRegistered = response.isAlreadyRegistered
              const otp = response.otp

              Alert.alert(
                'An account with this number already exists',
                'Do you want to reactivate your account?',
                [
                  { text: 'CANCEL' },
                  { text: 'OK', onPress: () => {
                    http('reactivateAccount', data).then((result) => {
                      if (result.status) {
                        // alert(JSON.stringify(response))
                        Actions.codeverify({
                          phoneNumber,
                          otp: '',
                          isRegistered,
                          token: result.loginResponse.access_token,
                          refreshToken: result.loginResponse.refresh_token,
                          userId: result.loginResponse.userId,
                        })
                      }
                    })
                    .catch((error) => {
                      alert(error)
                    })
                  } },
                ],
                { cancelable: false }
              )
            } else if (response.isAlreadyRegistered && response.isActive) {
              Actions.codeverify({
                phoneNumber: this.state.phoneNumber,
                otp: '',
                isRegistered: response.isAlreadyRegistered,
                token: response.loginResponse.access_token,
                refreshToken: response.loginResponse.refresh_token,
                userId: response.loginResponse.userId,
              })
            } else {
              Actions.codeverify({
                phoneNumber: this.state.phoneNumber,
                otp: '',
                isRegistered: response.isAlreadyRegistered,
              })
            }
          } else {
            alert(JSON.stringify(response))
          }
        })
        .catch((error) => {
          alert(error)
        })
      }
    })
  }

  phoneNumOnChange = (event) => {
    const phoneNumber = event.nativeEvent.text
    this.setState({ phoneNumber })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={true}>
          <Text style={styles.textColor}>
            Value Education will send an SMS to verify your mobile number.
            Please enter your mobile number.
          </Text>
          <View style={styles.textInput}>                              
          <TextInput
            ref="1"
            style={styles.phoneNumber}
            onChange={this.phoneNumOnChange}
            placeholder="Mobile number"
            value={this.state.phoneNumber}
            keyboardType="numeric"
            maxLength={10}
            autoFocus={true}
            returnKeyType="go"
            onSubmitEditing={this.getCode}
            clearButtonMode="while-editing"
            underlineColorAndroid={Colors.navBar}
          />
          </View>
          <TouchableOpacity
            onPress={this.getCode}
            style={[styles.loginbutton, { alignSelf: 'center' }]}
          >
            <Text style={styles.signin}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
        <Footer />
      </View>
    )
  }
}
