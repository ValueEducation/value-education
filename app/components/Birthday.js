import React, { Component } from 'react'

import {
  View,
  Image,
  Dimensions,
  AsyncStorage,
  ScrollView,
} from 'react-native'
import styles from '../utils/Styles'
import wishesPic from '../images/BirthdayWishes.jpg'
const { width } = Dimensions.get('window')

export default class BirthdayScreen extends Component {
  componentDidMount() {
    AsyncStorage.setItem('showBdayScreen', 'false')
  }

  render() {
    return (
      <View style={[styles.container, { alignItems: 'center', paddingHorizontal:10 }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={true}>
          <Image
            source={wishesPic}
            style={{
              height: 200,
              width,
              marginTop: 10,
            }}
            resizeMode="stretch"
          />
        </ScrollView>
      </View>
    )
  }
}
/*
  <Image
    source={{ uri: 'http://www.imagesbuddy.com/images/44/2013/06/happy-birthday-wallpaper-for-desktop-graphic.jpg' }}
    style={{flex: 1,width: null,height: null,alignSelf: 'stretch'}}
    resizeMode="cover"
  />
*/