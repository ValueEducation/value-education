import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  NetInfo,
  AsyncStorage,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import styles from '../../utils/Styles'
import http from '../../utils/Http'
import Colors from '../../utils/Colors'
import Footer from '../Footer'

export default class CodeVerify extends Component {

  constructor(props) {
    super(props)
    this.state = { otp: '' }
  }

  changeOtp = (event) => {
    const otp = event.nativeEvent.text
    this.setState({ otp })
  }

  verifyCode = async () => {
    dismissKeyboard()
    if (this.props.otp === this.state.otp) {
      if (this.props.isRegistered) {
        try {
          await AsyncStorage.setItem('token', this.props.token)
          await AsyncStorage.setItem('refreshToken', this.props.refreshToken)
          await AsyncStorage.setItem('userId', this.props.userId)
        } catch (e) { }

        if (this.props.token) {
          NetInfo.fetch().done((reach) => {
            if (reach === 'NONE') {
              alert('No Internet Connection')
            } else {
              http('profileInfo', { userId: this.props.userId }, 'POST', this.props.token)
              .then(async (response) => {
                if (response.status) {
                  try {
                    await AsyncStorage.setItem('name', response.name)
                    await AsyncStorage.setItem('email', response.email)
                    await AsyncStorage.setItem('birthDate', response.birthDate)
                    await AsyncStorage.setItem('profileImage', response.profileImage)
                    await AsyncStorage.setItem('phoneNumber', this.props.phoneNumber)
                  } catch (e) {}
                  Actions.drawer()
                } else {
                  alert(response.Message)
                }
              })
              .catch((error) => {
                alert(error)
              })
            }
          })
        }
      } else {
        Actions.profileinfo({ phoneNumber: this.props.phoneNumber })
      }
    } else {
      Alert.alert(
        '',
        'OTP does not match',
        [
          { text: 'OK', onPress: () => { this.refs['1'].focus(); } },
        ],
        { cancellable: false }
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}
        >
          <Text style={styles.textColor}>Verification code has been sent through SMS to +91- {this.props.phoneNumber}.
            <Text
              onPress={() => Actions.pop()}
              style={[styles.textColor, { color: Colors.thought }]}
            > Wrong Number?</Text>
          </Text>
          <Text style={[styles.textColor, { marginTop: 15 }]}>
          Please enter 6 digit verification code.</Text>
          <View style={styles.textInput}>                    
          <TextInput
            ref="1"
            style={styles.phoneNumber}
            onChange={this.changeOtp}
            placeholder="Verification Code"
            value={this.state.code}
            keyboardType="numeric"
            maxLength={6}
            autoFocus={true}
            returnKeyType="go"
            onSubmitEditing={this.verifyCode}
            clearButtonMode="while-editing"
            underlineColorAndroid={Colors.navBar}
          />
          </View>
          <TouchableOpacity
            onPress={this.verifyCode}
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

CodeVerify.propTypes = {
  phoneNumber: PropTypes.number,
  otp: PropTypes.string,
  isRegistered: PropTypes.bool,
  token: PropTypes.string,
  refreshToken: PropTypes.string,
  userId: PropTypes.string,
}
