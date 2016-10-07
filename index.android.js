import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Text,
  TouchableHighlight,
  BackAndroid,
  AsyncStorage,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Scene, Router } from 'react-native-router-flux'
var Orientation = require('react-native-orientation-listener')
import SplashScreen from 'react-native-splash-screen'

import Welcome from './components/welcome'
import Login from './components/login'
import Register from './components/register'
import Home from './components/home'
import Profile from './components/profile/profile'
import Settings from './components/settings'
import Search from './components/search'
import Notifications from './components/settings/notifications'
import Account from './components/settings/account'
import Frequency from './components/settings/frequency'
import ContentType from './components/settings/contentType'
import Aboutus from './components/settings/aboutus'
import styles from './utils/styles'
import EditProfile from './components/profile/editProfile'
import VerifyPhoneNum from './components/mobileverification/verifyPhoneNum'
import CodeVerify from './components/mobileverification/codeVerify'
import ProfileInfo from './components/profile/profileInfo'
import HomeScreen from './components/homeScreen'
import Thought from './components/categories/thought'
import Image from './components/categories/image'
import Story from './components/categories/story'
import Video from './components/categories/video'


console.disableYellowBox = true

BackAndroid.addEventListener('hardwareBackPress', function() {
  return false
});

class TabIcon extends Component {
  render() {
    return (
      <Text>{this.props.title}</Text>
    );
  }
}

class ValueEducation extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      logged: false,
      loading: true,
    }
   SplashScreen.hide()    
  }
  _setOrientation = (data) => {
    //alert(JSON.stringify(data))
    this.setState({
      orientation: data.orientation,
      device: data.device
    });
    const { height, width } = Dimensions.get('window')
  }
  componentDidMount = () => {
   SplashScreen.hide()
    AsyncStorage.getItem('token')
    .then( (value) => {
        if (value != null){
          this.setState({
            logged: true,
            loading: false,
          });
        } else{
          this.setState({
            loading: false,
          })
        }
      }
    )
  }

  goTo = () => {
  }
  leftButton = () => {
    return (
      <View>
        <TouchableHighlight underlayColor="transparent" onPress={this.goTo}>
          <Text>Settings</Text>
          <Icon name="user" size={50} color="red" />
        </TouchableHighlight>
      </View>
    )
  }
  rightButton = () => {
    return (
      <View>
        <TouchableHighlight underlayColor="transparent" onPress={this.goTo}>
          <Text>Profile</Text>
          <Icon name="user" size={50} color="red" />
        </TouchableHighlight>
      </View>
    )
  }
  render() {
    if (this.state.loading) {
      return <View><Text>Loading...</Text></View>;
    }
    return (
      <Router
        navigationBarStyle={styles.navBar}
        titleStyle={styles.navBarTitle}
        barButtonTextStyle={styles.barButtonTextStyle}
        barButtonIconStyle={styles.barButtonIconStyle}
      >
       {/* <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>*/}
        <Scene key="welcome" component={Welcome} title="Welcome" hideNavBar initial={!this.state.logged} />
        {/*<Scene key="login" component={Login} title="Login" hideNavBar={false} />
        <Scene key="register" component={Register} title="Register" hideNavBar={false} />*/}
        <Scene key="verifyphone" component={VerifyPhoneNum} title="Verify your phone number" hideNavBar={false}/>
        <Scene key="codeverify" component={CodeVerify} title="Verification Code" hideNavBar={false} />
        <Scene key="profileinfo" component={ProfileInfo} title="Profile info" hideNavBar={false} type="reset"/>

        <Scene key="main" initial={this.state.logged}>
         {/* <Scene key="root" tabs={true}>*/}
            <Scene
              key="homescreen"
              component={HomeScreen}
              title="Home"
              hideNavBar
              type="reset"
            />
            {/*<Scene
              key="home"
              component={Home}
              title="Home"
              hideNavBar
              type="reset"
              renderRightButton={this.rightButton}
              renderLeftButton={this.leftButton}
              icon={TabIcon}
            />   */}         
          <Scene key="profile" component={Profile} title="Profile" hideNavBar={false} />
          <Scene key="editprofile" component={EditProfile} title="Edit Profile" hideNavBar={false} />
          <Scene key="settings" component={Settings} title="Settings" hideNavBar={false} />
          <Scene key="notifications" component={Notifications} title="Notifications" hideNavBar={false} />
          <Scene key="account" component={Account} title="Account" hideNavBar={false} />
          <Scene key="frequency" component={Frequency} title="Frequency" hideNavBar={false} />
          <Scene key="contenttype" component={ContentType} title="Content type" hideNavBar={false} />
          <Scene key="aboutus" component={Aboutus} title="About us" hideNavBar={false} />          
          <Scene key="search" component={Search} title="Search" hideNavBar={false} />
          <Scene key="thought" component={Thought} title="Thought of the day" hideNavBar={false} />
          <Scene key="image" component={Image} title="Image of the day" hideNavBar={false} />
          <Scene key="story" component={Story} title="Story of the day" hideNavBar={false} />
          <Scene key="video" component={Video} title="Video of the day" hideNavBar={false} />       
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('ValueEducation', () => ValueEducation);
