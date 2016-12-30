import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Switch,
  ScrollView,
  NetInfo,
  Platform,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import GoogleAnalytics from 'react-native-google-analytics-bridge'
import { connect } from 'react-redux'
import CheckBox from 'react-native-checkbox'
import Toast from 'react-native-root-toast'
import Footer from './Footer'
import styles from '../utils/Styles'
import http from '../utils/Http'
import Colors from '../utils/Colors'
import { getRefreshToken } from './refreshToken'
import {
  alertsOn,
  alertsOff,
  enableThought,
  enableImage,
  enableStory,
  enableVideo,
} from '../actions/ValEduActions'

GoogleAnalytics.setTrackerId('UA-81365729-4')
GoogleAnalytics.setDispatchInterval(10)
GoogleAnalytics.trackScreenView('Settings')

let token
let userId

class Settings extends Component {
  componentDidMount = async () => {
    AsyncStorage.getItem('alert')
    .then((value) => {
      if (value === 'Off') {
        const { dispatch } = this.props
        dispatch(alertsOff())
      } else {
        const { dispatch } = this.props
        dispatch(alertsOn())
      }
    })
  }

  onSubscribe = async () => {
    try {
      userId = await AsyncStorage.getItem('userId')
      token = await AsyncStorage.getItem('token')
      refreshToken = await AsyncStorage.getItem('refreshToken')     
    } catch (e) { }
    const data = {
      userId,
      thoughtSubscribed: this.props.isThought ? 1 : 0,
      imageSubscribed: this.props.isImage ? 1 : 0,
      storySubscribed: this.props.isStory ? 1 : 0,
      videoSubscribed: this.props.isVideo ? 1 : 0,
    }
    NetInfo.fetch().done((reach) => {
      if (reach === 'NONE') {
        alert('No Internet Connection')
      } else {
        http('updateUserSubscription', data, 'POST', token)
        .then((response) => {
          // alert( 'response' + JSON.stringify(response))
          if(response.Message) {
            getRefreshToken()
            this.onSubscribe()
          } else if (!response.isActive) {
            AsyncStorage.multiRemove(['token', 'registerToken','showBdayScreen','refreshToken','name','email','profileImage','phoneNumber','birthDate'])
            Actions.welcome()
          } else if (response.status) {
            let toast = Toast.show('Content type updated successfully', {
              duration: 500,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            });        
            Actions.pop()
          } else {
            alert('error')
          }
        })
        .catch((error) => {
          alert(error)
        })
      }
    })
  }

  onAlert = (value) => {
    this.setState({ SwitchIsOn: value })
    if (value) {
      AsyncStorage.setItem('alert', 'On')
      const { dispatch } = this.props
      dispatch(alertsOn())
    } else {
      AsyncStorage.setItem('alert', 'Off')
      const { dispatch } = this.props
      dispatch(alertsOff())
    }
    AsyncStorage.multiGet(['token', 'userId', 'registerToken', 'refreshToken'])
    .then((values) => {
      const data = {
        userId: values[1][1],
        deviceToken: values[2][1],
        isNotificationEnabled: value,
      }
      if (values[0][1] != null) {
        NetInfo.fetch().done((reach) => {
          if (reach === 'NONE') {
            alert('No Internet Connection')
          } else {
            http('toggleNotification', data, 'POST', values[0][1])
            .then((response) => {
              if(response.Message) {
                getRefreshToken()
                this.onAlert()
              } else if (!response.isActive) {
                AsyncStorage.multiRemove(['token', 'registerToken','showBdayScreen','refreshToken','name','email','profileImage','phoneNumber','birthDate'])
                Actions.welcome()
              } else if (response.status) {
                if(value) {
                  let toast1 = Toast.show('Notifications On', {
                    duration: 500,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                  })
                } else {
                  let toast2 = Toast.show('Notifications Off', {
                    duration: 500,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                  })
                }
              } else {
                alert('error occured')
              }
            })
            .catch((error) => {
              alert(error)
            })
          }
        })
      }
    })
  }

  render() {
    return (
      <View style={[styles.container, { paddingTop: 65 }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}
        >
          <Text style={styles.textColor}>Notifications</Text>
          <View style={styles.settingsContainer}>
            <Text style={styles.textColor}>Alerts</Text>
            <Switch
              value={this.props.alertsOn}
              onValueChange={this.onAlert}
              style={styles.switch}
            />
          </View>
          <Text style={styles.textColor}>Content-Type</Text>
          <View style={styles.settingsContainer}>
            <CheckBox
              label="Thought"
              checked={this.props.isThought}
              labelStyle={{ color: Colors.black }}
              underlayColor={"transparent"}
              onChange={(checked) => {
                const { dispatch } = this.props
                Platform.OS == 'ios' ?
                dispatch(enableThought(!checked)) :
                dispatch(enableThought(checked))
              }}
            />
            <CheckBox
              label="Image"
              checked={this.props.isImage}
              labelStyle={{ color: Colors.black }}
              underlayColor={"transparent"}
              onChange={(checked) => {
                const { dispatch } = this.props
                Platform.OS == 'ios' ?
                dispatch(enableImage(!checked)) :
                dispatch(enableImage(checked))
              }}
            />
            <CheckBox
              label="Story"
              checked={this.props.isStory}
              labelStyle={{ color: Colors.black }}
              underlayColor={"transparent"}
              onChange={(checked) => {
                const { dispatch } = this.props
                Platform.OS == 'ios' ?
                dispatch(enableStory(!checked)) :
                dispatch(enableStory(checked))
              }}
            />
            <CheckBox
              label="Video"
              checked={this.props.isVideo}
              labelStyle={{ color: Colors.black }}
              underlayColor={"transparent"}
              onChange={(checked) => {
                const { dispatch } = this.props
                Platform.OS == 'ios' ?
                dispatch(enableVideo(!checked)) :
                dispatch(enableVideo(checked))
              }}
            />
            <TouchableOpacity
              onPress={this.onSubscribe}
              style={[styles.loginbutton, { alignSelf: 'center' }]}
            >
              <Text style={styles.signin}>Save</Text>
            </TouchableOpacity>
          </View>        
        </ScrollView>
        <Footer />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    alertsOn: state.ValEdu.get('alertsOn'),
    isThought: state.ValEdu.get('isThought'),
    isImage: state.ValEdu.get('isImage'),
    isStory: state.ValEdu.get('isStory'),
    isVideo: state.ValEdu.get('isVideo'),
  }
}

Settings.propTypes = {
  dispatch: PropTypes.object,
  isThought: PropTypes.bool,
  isImage: PropTypes.bool,
  isStory: PropTypes.bool,
  isVideo: PropTypes.bool,
  alertsOn: PropTypes.bool,
}

export default connect(mapStateToProps)(Settings);
