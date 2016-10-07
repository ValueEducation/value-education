import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  AsyncStorage,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import styles from '../../utils/styles'
import profileIcon from '../../images/default.gif'
import http from '../../utils/http'
import { validateEmail } from '../../utils/validations'

const { width } = Dimensions.get('window')

export default class ProfileInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      date: '',
      source: profileIcon,
      emailError: '',
      base64: '',
    }
  }
  gotoHome = () => {
    dismissKeyboard()
    const emailError = this.state.emailError
    if (!emailError) {
      const data = {
        'email': this.state.email,
        'password': this.props.otp,
        'name': this.state.name,
        'phoneNumber':this.props.phoneNumber,
        'birthDate': this.state.date,
        'profileImage': this.state.base64,
      }
      http('token', data)
      .then((response) => {
        alert(JSON.stringify(response))
        if (response.token && response.status) {
          AsyncStorage.setItem('token', response.token)
          AsyncStorage.setItem('userId', response.userId)
          Actions.main()
        }
      })
      .catch((error) => {
        alert(error)
      })
    }
  }

  emailOnChange = (event) => {
    const email = event.nativeEvent.text
    const emailError = validateEmail(email)
    this.setState({ email, emailError })
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
        this.setState({ base64: response.data })
        const source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true }
        this.setState({
          source,
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text}>Please provide your name, email, date of birth and optional profile photo</Text>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 15, marginTop: 15 }}>
            <View>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={this.openGallery}
              >
                <Image
                  source={this.state.source}
                  style={{
                    height: 70,
                    width: 70,
                    borderColor: 'rgb(17, 150, 182)',
                    borderWidth: 0.5,
                    borderRadius: 35,
                    marginTop: 7,
                  }}
                />
              </TouchableHighlight>
            </View>

            <View style={{ width: width - 115 }}>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(name) => this.setState({ name })}
                placeholder="name"
                value={this.state.name}
                maxLength={25}
                returnKeyType="next"
              />
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChange={this.emailOnChange}
                placeholder="email"
                value={this.state.email}
                keyboardType="email-address"
                returnKeyType="next"
              />
            </View>
          </View>
          <View>
            <DatePicker
              style={{ width: width - 40 }}
              date={this.state.date}
              mode="date"
              placeholder="YYYY-MM-DD"
              confirmBtnText="OK"
              cancelBtnText="Cancel"
              showIcon={false}
              autoFocus={true}
              onDateChange={(date) => { this.setState({ date }) }}
              customStyles={{
                placeholderText: {
                  color: 'gray',
                  fontSize: 17,
                },
                dateInput: {
                  flex: 1,
                  height: 40,
                  borderWidth: 1,
                  borderColor: 'rgb(234,251,253)',
                },
                dateText: {
                  color: '#000',
                  fontSize: 17,
                },
              }}
            />
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.gotoHome}
              style={[styles.loginbutton, { alignSelf: 'center' }]}
            >
              <Text style={styles.signin}>
                Next
              </Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    )
  }
}
