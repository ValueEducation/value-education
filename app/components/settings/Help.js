import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  NetInfo,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native'
import Emoji from 'react-native-emoji'
import GoogleAnalytics from 'react-native-google-analytics-bridge'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import Slider from 'react-native-slider'
import { Actions } from 'react-native-router-flux'
import Toast from 'react-native-root-toast'
import styles from '../../utils/Styles'
import http from '../../utils/Http'
import Footer from '../Footer'
import Colors from '../../utils/Colors'
import { getRefreshToken } from '../refreshToken'

var RCTUIManager = require('NativeModules').UIManager
let userId
let token

export default class Help extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feedback: '',
      value: 10,
      emoji1: true,
      emoji2: true,
      emoji3: true,
      emoji4: true,
      emoji5: false,
      rating: 5,
    }
  }

  tapSliderHandler = (evt) => { 
    this.refs.slider.measure((fx, fy, width, height, px, py) => {
      var sliderValue = ((evt.nativeEvent.locationX - px) / width)* 10
      // alert(sliderValue)
      var roundedValue = Math.round(sliderValue)
      if(roundedValue == 0){
        roundedValue = 1
      }
      this.setState({value: roundedValue })
    })
  }
  measureView=(event)=> {
  }


  onFeedback = async () => {
    // Share.open(shareOptions)
    /*Share.shareSingle(Object.assign(shareOptions, {
      "social": "email"
    }))*/
    try {
      userId = await AsyncStorage.getItem('userId')
      token = await AsyncStorage.getItem('token')
      refreshToken = await AsyncStorage.getItem('refreshToken')
    } catch (e) { }
    const data = {
      userId,
      feedbackRating: this.state.rating,
      thoughts: this.state.feedback,
      recommendRating: this.state.value,
      feedbackDate: new Date(),
    }
    NetInfo.fetch().done((reach) => {
      if (reach === 'NONE') {
        alert('No Internet Connection')
      } else {
        http('saveFeedback', data, 'POST', token)
        .then((response) => {
          if(response.Message) {
            getRefreshToken()
            this.onFeedback()
          } else if (!response.isActive) {
            AsyncStorage.multiRemove(['token', 'registerToken','showBdayScreen','refreshToken','name','email','profileImage','phoneNumber','birthDate'])
            Actions.welcome()
          } else if (response.status) {
            GoogleAnalytics.trackEvent('FeedbackGiven', 'feedback')
            let toast = Toast.show('Feedback saved successfully', {
              duration: 500,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            })
            Actions.pop()
          }
        })
        .catch((error) => {
          alert(error)
        })
      }
    })
  }

  onEmoji1 = () => {
    this.setState({
      emoji1: false,
      emoji2: true,
      emoji3: true,
      emoji4: true,
      emoji5: true,
      rating: 1,
    })
  }

  onEmoji2 = () => {
    this.setState({
      emoji1: true,
      emoji2: false,
      emoji3: true,
      emoji4: true,
      emoji5: true,
      rating: 2,
    })
  }

  onEmoji3 = () => {
    this.setState({
      emoji1: true,
      emoji2: true,
      emoji3: false,
      emoji4: true,
      emoji5: true,
      rating: 3,
    })
  }

  onEmoji4 = () => {
    this.setState({
      emoji1: true,
      emoji2: true,
      emoji3: true,
      emoji4: false,
      emoji5: true,
      rating: 4,
    })
  }

  onEmoji5 = () => {
    this.setState({
      emoji1: true,
      emoji2: true,
      emoji3: true,
      emoji4: true,
      emoji5: false,
      rating: 5,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}
        >
          <Text style={styles.textColor}>What do you think of our app?</Text>
          <View style={styles.emojiContainer}>
            <Text style={[styles.emoji, {opacity: this.state.emoji1 ? 0.5 : 1}]} onPress={this.onEmoji1}>
              <Emoji name='rage' />
            </Text>
            <Text style={[styles.emoji, {opacity: this.state.emoji2 ? 0.5 : 1}]} onPress={this.onEmoji2}>
              <Emoji name='disappointed' />
            </Text>
            <Text style={[styles.emoji, {opacity: this.state.emoji3 ? 0.5 : 1}]} onPress={this.onEmoji3}>
              <Emoji name='expressionless' />
            </Text>
            <Text style={[styles.emoji, {opacity: this.state.emoji4 ? 0.5 : 1}]} onPress={this.onEmoji4}>
              <Emoji name='smile' />
            </Text>
            <Text style={[styles.emoji, {opacity: this.state.emoji5 ? 0.5 : 1}]} onPress={this.onEmoji5}>
              <Emoji name='heart_decoration' />
            </Text>
          </View>
          <Text style={styles.textColor}>What would you like to share with us?</Text>
          <View style={styles.autogrowInput}>
            <AutoGrowingTextInput
              value={this.state.feedback}
              onChangeText={(feedback) => this.setState({ feedback })}
              placeholder={"Your Thoughts"}
              maxHeight={200}
              underlineColorAndroid="transparent"
              maxLength={150}
              autoCapitalize={"sentences"}
            />
          </View>
          <Text style={{ alignSelf:'flex-end', color: 'gray', fontSize: 12, marginBottom: 30 }}>(maximum: 150 characters)</Text>
          <Text style={styles.textColor}>How likely would you recommend our app to your friends and
             colleagues?
          </Text>
          <View ref="slider" onLayout={(event) => this.measureView(event)}>
          <TouchableWithoutFeedback onPressIn={this.tapSliderHandler}>
            <Slider
              maximumValue={10}
              minimumValue={1}
              step={1}
              trackStyle={styles.track}
              thumbStyle={styles.thumb}
              value={this.state.value}
              minimumTrackTintColor={Colors.thought}
              maximumTrackTintColor={Colors.gray}
              onValueChange={(value) => this.setState({ value })}
              style={{ marginTop: 20 }}
            />
          </TouchableWithoutFeedback>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.textColor, { color: 'red' }]}>not at all</Text>
            <Text style={[styles.textColor, { color: 'green' }]}>very likely</Text>
          </View>
          <Text style={{color: 'green'}}>{this.state.value}</Text>
          <TouchableOpacity onPress={this.onFeedback} style={[styles.loginbutton, { alignSelf: 'center' }]}>
            <Text style={styles.signin}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
        <Footer />
      </View>
    )
  }
}

{/* <View style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 20,}}>

<Text style={[styles.textColor, {alignSelf:'flex-end', color:'red'}]}>*Required</Text>
      <View style={{borderColor: Colors.navBar, borderWidth: 1,padding: 3}}>
      <Text>1</Text>
      </View>
      <View style={{borderColor: Colors.navBar, borderWidth: 1,padding: 3}}>
      <Text>2</Text>
      </View>
      <View style={{borderColor: Colors.navBar, borderWidth: 1,padding: 3}}>
      <Text>3</Text>
      </View>
      <View style={{borderColor: Colors.navBar, borderWidth: 1,padding: 3}}>
      <Text>4</Text>
      </View>
      <View style={{borderColor: Colors.navBar, borderWidth: 1,padding: 3}}>
      <Text>5</Text>
      </View>
      <View style={{borderColor: Colors.navBar, borderWidth: 1,padding: 3}}>
      <Text>6</Text>
      </View>
      <View style={{borderColor: Colors.navBar, borderWidth: 1,padding: 3}}>
      <Text>7</Text>
      </View>
      <View style={{borderColor: Colors.navBar, borderWidth: 1,padding: 3}}>
      <Text>8</Text>
      </View>
      <View style={{borderColor: Colors.navBar, borderWidth: 1,padding: 3}}>
      <Text>9</Text>
      </View>
      <View style={{borderColor: Colors.navBar, borderWidth: 1,padding: 3}}>
      <Text>10</Text>
      </View>
      </View>*/}

