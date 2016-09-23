/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../utils/styles'
import profileIcon from '../images/default.gif'
import http from '../utils/http'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      age: '',
      source: profileIcon,
    }
  }
  editProfile = () => {
    Actions.editprofile()
  }

  componentDidMount = () => {
    AsyncStorage.multiGet(['token', 'userId'])
    .then((values) => {
      //  alert(JSON.stringify(values))
      if (values[0][1] != null) {
        http('profileInfo',{'userId':values[1][1]},'POST',values[0][1])
        .then((response) => {
        alert(JSON.stringify(response))
        if(response.status){
          this.setState({name:response.name})
          const date2 = new Date()
          const date1 = new Date(response.birthDate)
          const timeDiff =  Math.abs(date2.getTime() - date1.getTime())
          const age = Math.ceil(timeDiff / (1000 * 3600 * 24 * 365))
          this.setState({name:response.name,age})

        }
      })
      .catch((error) => {
        alert(error);
      })
    }})
  }
  openGallery = () => {
    const options = {
      title: 'Choose your profile picture',
      takePhotoButtonTitle: 'Take Photo',
      chooseFromLibraryButtonTitle: 'Choose from Library',
      quality: 1,
      maxWidth: 600,
      maxHeight: 300,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
      },
    }
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        alert('User cancelled photo picker')
      } else if (response.error) {
        alert('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        alert('User tapped custom button: ', response.customButton)
      } else {
        let source3
        source3 = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true }
        this.setState({
          source: source3,
        })
      }
    })
  }
    /* ImagePicker.launchImageLibrary(options, (response)  => {
      // Same code as in above section!
      alert(response)
    });
    ImagePicker.launchCamera(options, (response)  => {
      // Same code as in above section!
    alert(response);
    }); */
  render() {
    return (
      <View style={[styles.container, { padding: 15 }]}>
      <TouchableHighlight underlayColor="transparent" onPress={this.editProfile} style={{alignSelf:'flex-end'}}>
            <Icon name="edit" color="green" size={30} />
        </TouchableHighlight>
        <View style={{alignSelf:'center'}}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={this.openGallery}
          >
            <Image
              source={this.state.source}
              style={{
                height: 70,
                width: 70,
                borderColor: 'green',
                borderWidth: 0.5,
                borderRadius: 35,
              }}
            />
          </TouchableHighlight>
          <Text style={[styles.textColor,{marginTop:30}]}>Name: {this.state.name}</Text>
          <Text style={[styles.textColor,{marginTop:5}]}>email: test@ggktech.com</Text>
          <Text style={[styles.textColor,{marginTop:5}]}>Age: {this.state.age}</Text>         
        </View>
      </View>
    )
  }
}
