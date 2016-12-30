import React, { Component, PropTypes } from 'react'
import {
  View,
  TouchableOpacity,
  AsyncStorage,
  Linking,
  BackAndroid,
  Alert,
  AppState,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Scene, Router } from 'react-native-router-flux'
import DeviceInfo from 'react-native-device-info'
import { connect } from 'react-redux'
import Welcome from './Welcome'
import Settings from './Settings'
import Account from './settings/Account'
import Aboutus from './settings/AboutUs'
import EditProfile from './profile/EditProfile'
import VerifyPhoneNum from './mobileverification/VerifyPhoneNum'
import CodeVerify from './mobileverification/CodeVerify'
import ProfileInfo from './profile/ProfileInfo'
import ContentScreen from './ContentScreen'
import NavigationDrawer from './NavigationDrawer'
import BirthdayScreen from './Birthday'
import Help from './settings/Help'
import Title from './Title'
import ContentRightButton from './ContentRightButton'
import VideoPlayer from './VideoPlayer'
import {
  showModal,
  enableThought,
  enableImage,
  enableStory,
  enableVideo,
} from './../actions/ValEduActions'
import styles from '../utils/Styles'
import Colors from '../utils/Colors'
import http from '../utils/Http'

let token
let userId
let url = 'https://play.google.com/store/apps/details?id=com.imangi.templerun2'
console.disableYellowBox = true

class ValueEducation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logged: false,
      loading: true,
    }
  }
/*{ text: 'Cancel', onPress: () => { BackAndroid.exitApp() } },*/
  handleAppStateChange = (appState) => {
    if(appState == 'active') {
      fetch('http://103.255.144.120:8888/api/Content/FetchLatestAppVersion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
      .then((response) => {
        if (response.status) {
          if(DeviceInfo.getVersion() != response.appVersion)  {
            Alert.alert(
              'Update Available',
              'Please update your app to the latest version',
              [               
                { text: 'OK', onPress: () => {
                  Linking.canOpenURL(url).then(supported => {
                    if (supported) {
                      Linking.openURL(url);
                    } else {
                      alert('Don\'t know how to open URI: ' + url);
                    }
                  })
                } },
              ],
              { cancelable: false }
            )           
          }          
        }
      })
      .catch((error) => {
        alert(error)
      })
    }
  }

  componentDidMount = async () => {
    AppState.addEventListener('change', this.handleAppStateChange)
    this.handleAppStateChange('active')
    try {
      userId = await AsyncStorage.getItem('userId')
      token = await AsyncStorage.getItem('token')
    } catch (e) { }
    if (token && userId) {
      this.setState({
        logged: true,
        loading: false,
      })
      http('fetchUserSubscription', { userId }, 'POST', token)
      .then((response) => {
          // alert( 'response' + JSON.stringify(response))
        if (response.status) {
          const { dispatch } = this.props
          dispatch(enableThought(response.thoughtSubscribed))
          dispatch(enableImage(response.imageSubscribed))
          dispatch(enableStory(response.storySubscribed))
          dispatch(enableVideo(response.videoSubscribed))
        }
      })
      .catch((error) => {
        alert(error)
      })
    } else {
      this.setState({
        loading: false,
      })
    }
  }

  getTitle = () => {
    return <Title />
  }

  Search = () => {
    const { dispatch } = this.props
    dispatch(showModal())
  }

  rightButton = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={this.Search}>
          <Icon name="search" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    )
  }

  homeLeftButton = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={this.Search}>
          <Icon name="bars" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    )
  }

  contentRightButton = () => {
    return <ContentRightButton />
  }

  render() {
    if (this.state.loading) {
      return <View />
    }
    return (
      <Router
        navigationBarStyle={styles.navBar}
        titleStyle={styles.navBarTitle}
        barButtonTextStyle={styles.barButtonTextStyle}
        barButtonIconStyle={styles.barButtonIconStyle}
      >
        <Scene
          key="welcome"
          component={Welcome}
          title="Welcome"
          hideNavBar
          initial={!this.state.logged}
        />
        <Scene
          key="verifyphone"
          component={VerifyPhoneNum}
          title="Verify your Mobile Number"
          type="reset"
        />
        <Scene key="codeverify" component={CodeVerify} title="Verification Code" />
        <Scene
          key="profileinfo"
          component={ProfileInfo}
          title="Profile"
          hideBackImage = {true}
          onBack = {() =>{return null}}
        />
        <Scene
          key="birthday"
          component={BirthdayScreen}
          title="Happy Birthday"
          hideNavBar={false}
        />
        <Scene key="video" component={VideoPlayer} title="Video" />
        <Scene key="drawer" component={NavigationDrawer} initial={this.state.logged} hideNavBar />
        <Scene
          key="contentscreen"
          component={ContentScreen}
          renderTitle={this.getTitle}
        />
        <Scene key="editprofile" component={EditProfile} title="Edit Profile" hideNavBar={false} />
        <Scene key="settings" component={Settings} title="Settings" hideNavBar={false} />
        <Scene key="account" component={Account} title="Account" hideNavBar={false} />
        <Scene key="aboutus" component={Aboutus} title="About Value Education" hideNavBar={false} />
        <Scene
          key="help"
          component={Help}
          title="Help & Feedback"
          hideNavBar={false}
        />
      </Router>
    )
  }
}

ValueEducation.propTypes = {
  dispatch: PropTypes.object,
}

export default connect()(ValueEducation)
/*renderTitle={this.getTitle}
          rightTitle="Submit"
          rightButtonTextStyle={{color: 'white'}}
          onRight={() => {
            alert('Submit')
          }}
          renderRightButton={this.contentRightButton}
renderRightButton={this.rightButton}
*/
