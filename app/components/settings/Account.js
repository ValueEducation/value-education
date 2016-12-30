import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  NetInfo,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import GoogleAnalytics from 'react-native-google-analytics-bridge'
import { Actions } from 'react-native-router-flux'
import styles from '../../utils/Styles'
import http from '../../utils/Http'
import Footer from '../Footer'
import { getRefreshToken } from '../refreshToken'
import Colors from '../../utils/Colors'

export default class Account extends Component {
  onDelete = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your Account?',
      [
        { text: 'Cancel' },
        { text: 'OK', onPress: this.deleteAccount },
      ],
      { cancellable: false }
    )
  }

  deleteAccount = async () => {
    let userId
    try {
      userId = await AsyncStorage.getItem('userId')
      refreshToken = await AsyncStorage.getItem('refreshToken')      
    } catch (e) { }
    NetInfo.fetch().done((reach) => {
      if (reach === 'NONE') {
        alert('No Internet Connection')
      } else {
        http('deleteAccount', { userId })
        .then((response) => {
          if(response.Message) {
            getRefreshToken()
            this.deleteAccount()
          } else if (!response.isActive) {
            AsyncStorage.multiRemove(['token', 'registerToken','showBdayScreen','refreshToken','name','email','profileImage','phoneNumber','birthDate'])
            Actions.welcome()
          } else if (response.status) {
            GoogleAnalytics.trackEvent('AccountDeleted', 'account')
            AsyncStorage.multiRemove(['token', 'registerToken','showBdayScreen','refreshToken','name','email','profileImage','phoneNumber','birthDate'])
            Actions.welcome()
          }
        })
        .catch((error) => {
          alert(error)
        })
      }
    })
  }
  render() {
    return (
      <View style={[styles.container, { paddingHorizontal: 0 }]}>
        <TouchableOpacity onPress={this.onDelete} style={{ borderBottomColor: Colors.gray, borderBottomWidth: 1, padding: 10 }}>
          <Text style={styles.textColor}>Delete Account</Text>
          <Icon name="trash" color='red' size={20} style={{ marginRight: 10, marginTop: -20, alignSelf: 'flex-end' }} />
        </TouchableOpacity>
        <Footer />
      </View>
    )
  }
}
