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

const { height, width } = Dimensions.get('window')

export default class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      email: '',
      date: this.props.date,
      source: { uri: 'data:image/jpeg;base64,' + this.props.base64, isStatic: true },
      emailError: '',
      base64: this.props.base64,
    }
  }
  gotoHome = () => {
    dismissKeyboard()
    const emailError = this.state.emailError
    if (!emailError) {
      AsyncStorage.multiGet(['token', 'userId'])
      .then((values) => {
        let data = {
          "userId":values[1][1],
          "name": this.state.name,
          "birthDate": this.state.date,
          "profileImage": this.state.base64
        }
        if (values[0][1] != null) {
          http('updateProfile',data,'POST',values[0][1])
          .then((response) => {
            alert(JSON.stringify(response))
          if(response.status){
            Actions.profile()
          }
        })
        .catch((error) => {
          alert(error)
        })
      }})
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
        const source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true }
        this.setState({
          source,
          base64:response.data,
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
         {/* <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 15, marginTop: 15 }}>
            <View>*/}
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
                    marginTop:7,
                    alignSelf: 'center',
                  }}
                />
              </TouchableHighlight>
            {/*</View>

            <View style={{ width: width - 115 }}>*/}
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(name) => this.setState({ name })}
                placeholder="name"
                value={this.state.name}
                maxLength={25}
                returnKeyType="next"
              />
              {/* <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChange={this.emailOnChange}
                placeholder="email"
                value={this.state.email}
                keyboardType="email-address"
                returnKeyType="next"
              />
           </View>
          </View>*/}

          <View>
            <DatePicker
              style={{ width: width - 40 }}
              date={this.state.date}
              mode="date"
              placeholder="Date of Birth"
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
                Save
              </Text>
            </TouchableHighlight>
            { /*<TouchableHighlight
              underlayColor="transparent"
              onPress={() => Actions.profile()}
              style={styles.loginbutton}
            >
              <Text style={styles.signin}>
                Cancel
              </Text>
            </TouchableHighlight>*/ }
          </View>
        </ScrollView>
      </View>
    )
  }
}
