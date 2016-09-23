/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

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
var Orientation = require('react-native-orientation-listener');
import Welcome from './components/welcome'
import Login from './components/login'
import Register from './components/register'
import Home from './components/home'
import Profile from './components/profile'
import Settings from './components/settings'
import Search from './components/search'
import Notifications from './components/notifications'
import Account from './components/account'
import Frequency from './components/frequency'
import ContentType from './components/contentType'
import Aboutus from './components/aboutus'
import styles from './utils/styles'
import EditProfile from './components/editProfile'

console.disableYellowBox = true
BackAndroid.addEventListener('hardwareBackPress', function() {
  return false
});

class ValueEducation extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      logged: false,
      loading: true,
    };
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
    Orientation.getOrientation((orientation) => {
   //   alert(JSON.stringify(orientation));
    })
    Orientation.addListener(this._setOrientation);
    /*fetch('http://172.16.1.134:8990/api/Account/RegisterUser', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        "email": "test23334@gmail.com",
        "password": "Welcome@1234",
        "name": "Test123334",
        "phoneNumber": "1234211199",
        "birthDate": "2016-08-06T17:55:00.000+0530"
        })
      }).then((response) => response.json())
      .then((response) => {
        alert(JSON.stringify(response));
      })
      .catch((error) => {
      });*/
    AsyncStorage.getItem('token')
    .then( (value) =>{
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
    );
  }
  componentWillMount = () => {
   
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
        <Scene key="login" component={Login} title="Login" hideNavBar={false} />
        <Scene key="register" component={Register} title="Register" hideNavBar={false} />
        <Scene key="main" initial={this.state.logged}>
          <Scene
            key="home"
            component={Home}
            title="Home"
            hideNavBar
            type="reset"
            renderRightButton={this.rightButton}
            renderLeftButton={this.leftButton}
          />
          <Scene
            key="profile"
            component={Profile}
            title="Profile"
            hideNavBar={false}
            direction="vertical"
          />
          <Scene
            key="editprofile"
            component={EditProfile}
            title="Edit Profile"
            hideNavBar={false}
            direction="vertical"
          />         
          <Scene key="settings" component={Settings} title="Settings" hideNavBar={false} />
          <Scene key="notifications" component={Notifications} title="Notifications" hideNavBar={false} direction="vertical" />
          <Scene key="account" component={Account} title="Account" hideNavBar={false} direction="vertical" />
          <Scene key="frequency" component={Frequency} title="Frequency" hideNavBar={false} direction="vertical" />
          <Scene key="contenttype" component={ContentType} title="ContentType" hideNavBar={false} direction="vertical" />
          <Scene key="aboutus" component={Aboutus} title="About Us" hideNavBar={false} direction="vertical" />          
          <Scene key="search" component={Search} title="Search" hideNavBar={false} direction="vertical" />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('ValueEducation', () => ValueEducation);
