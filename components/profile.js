import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import GoogleAnalytics from 'react-native-google-analytics-bridge'

import styles from '../utils/styles'
import profileIcon from '../images/default.gif'
import http from '../utils/http'

GoogleAnalytics.setTrackerId('UA-81365729-4')
GoogleAnalytics.setDispatchInterval(10)
GoogleAnalytics.trackScreenView('Profile')

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      age: '',
      source: profileIcon,
      dob: '',
      base64: '',
    }
  }
  componentDidMount = () => {
    AsyncStorage.multiGet(['token', 'userId'])
    .then((values) => {
      if (values[0][1] != null) {
        http('profileInfo', { 'userId': values[1][1] }, 'POST', values[0][1])
        .then((response) => {
          if (response.status) {
            const date2 = new Date()
            const date1 = new Date(response.birthDate)
            const timeDiff = Math.abs(date2.getTime() - date1.getTime())
            const age = Math.ceil(timeDiff / (1000 * 3600 * 24 * 365))
            const source = { uri: 'data:image/jpeg;base64,' + response.profileImage, isStatic: true }
            this.setState({
              name: response.name,
              base64: response.profileImage,
              dob: response.birthDate,
              age,
              source,
            })
            AsyncStorage.setItem('name', response.name)
            AsyncStorage.setItem('dob', response.birthDate)
            AsyncStorage.setItem('email', '')
            AsyncStorage.setItem('base64', response.profileImage)
          }
        })
      .catch((error) => {
        alert(error)
      })
      } })
  }
  editProfile = () => {
    Actions.editprofile({ name: this.state.name, base64: this.state.base64, date: this.state.dob })
  }
  render() {
    return (
     // <Image source={this.state.source} style={styles.container}>
      <View style={styles.container}>
        <TouchableHighlight underlayColor="transparent" onPress={this.editProfile} style={{ alignSelf: 'flex-end' }}>
          <Icon name="edit" color="rgb(17, 150, 182)" size={30} />
        </TouchableHighlight>
        <View style={{ alignSelf: 'center' }}>
          <Image
            source={this.state.source}
            style={{
              height: 70,
              width: 70,
              borderColor: 'rgb(17, 150, 182)',
              borderWidth: 0.5,
              borderRadius: 35,
            }}
          />
          <Text style={[styles.textColor, { marginTop: 30 }]}>Name: {this.state.name}</Text>
          <Text style={[styles.textColor, { marginTop: 5 }]}>email: </Text>
          <Text style={[styles.textColor, { marginTop: 5 }]}>Age: {this.state.age}</Text>
        </View>
      </View>
  //  </Image>
    )
  }
}
