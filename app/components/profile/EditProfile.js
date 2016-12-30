import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  Dimensions,
  ScrollView,
  NetInfo,
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import { connect } from 'react-redux'
import Toast from 'react-native-root-toast'
import { saveProfileInfo } from '../../actions/ValEduActions'
import styles from '../../utils/Styles'
import http from '../../utils/Http'
import { validateEmail } from '../../utils/Validations'
import Colors from '../../utils/Colors'
import Footer from '../Footer'
import { getRefreshToken } from '../refreshToken'

const { width } = Dimensions.get('window')
let maxDate = new Date()
class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      email: this.props.email,
      date: this.props.dob,
      errorText: '',
      base64: this.props.profileImage,
    }
  }

  gotoHome = () => {
    dismissKeyboard()
    const emailError = this.state.emailError
    if (this.state.name === '') {
      this.setState({ errorText: 'Name is required' })
      this.refs.name.focus()
    } else if (this.state.email === '') {
      this.setState({ errorText: 'Email is required' })
      this.refs.email.focus()
    } else if (emailError) {
      this.setState({ errorText: 'Please enter valid email address' })
      this.refs.email.focus()
    } else if (this.state.date === '') {
      this.setState({ errorText: 'Date of birth is required' })
    } else if (!emailError) {
      AsyncStorage.multiGet(['token', 'userId'])
      .then((values) => {
        const data = {
          userId: values[1][1],
          name: this.state.name,
          birthDate: this.state.date,
          email: this.state.email,
          profileImage: this.state.base64,
        }

        if (values[0][1] != null) {
          NetInfo.fetch().done((reach) => {
            if (reach === 'NONE') {
              alert('No Internet Connection')
            }
            else {
              http('updateProfile', data, 'POST', values[0][1])
              .then((response) => {
                if(response.Message) {
                  getRefreshToken()
                  this.gotoHome()
                } else if (!response.isActive) {
                  AsyncStorage.multiRemove(['token', 'registerToken','showBdayScreen','refreshToken','name','email','profileImage','phoneNumber','birthDate'])
                  Actions.welcome()
                } else if (response.status) {
                  const date2 = new Date()
                  const date1 = new Date(this.state.date)
                  const timeDiff = Math.abs(date2.getTime() - date1.getTime())
                  const age = Math.ceil(timeDiff / (1000 * 3600 * 24 * 365))
                  AsyncStorage.setItem('name', data.name)
                  AsyncStorage.setItem('email', data.email)
                  AsyncStorage.setItem('birthDate', data.birthDate)
                  AsyncStorage.setItem('profileImage', data.profileImage)
                  const { dispatch } = this.props
                  dispatch(saveProfileInfo(this.state.name, this.state.email, this.state.base64, date1, age))
                  let toast = Toast.show('Profile updated successfully', {
                    duration: 500,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                  });  
                  Actions.pop()
                } else {
                  alert(response.Message)
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
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        this.setState({
          base64: response.data,
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={true}
        >
          <Text style={styles.errorText}>{this.state.errorText}</Text>
          <Text style={styles.textColor}>Please modify your Name, Email, Date of Birth
            and Optional Photo for Profile information.
          </Text>
          <View style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: 15,
            marginTop: 15,
          }}>
            <View>
              <TouchableOpacity onPress={this.openGallery}>
                <Image
                  source={{ uri: 'data:image/jpeg;base64,' + this.state.base64, isStatic: true }}
                  style={styles.profileIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 45 }}>
              <View style={styles.textInput}>                    
                <TextInput
                  ref="name"
                  style={{ height: 40 }}
                  onChangeText={(name) => this.setState({ name })}
                  placeholder="Name"
                  value={this.state.name}
                  maxLength={25}
                  returnKeyType="next"
                  underlineColorAndroid={Colors.navBar}
                  placeholderTextColor={Colors.black}                
                  onSubmitEditing={(e) => {
                    this.refs.email.focus()
                  }}
                />
              </View>
              <View style={styles.textInput}>                    
                <TextInput
                  ref="email"
                  style={{ height: 40 }}
                  onChange={this.emailOnChange}
                  placeholder="Email address"
                  value={this.state.email}
                  underlineColorAndroid={Colors.navBar}
                  placeholderTextColor={Colors.black}                
                  keyboardType="email-address"
                />
              </View>
              <DatePicker
                style={{ width: width - 136, marginHorizontal: 3 }}
                date={this.state.date}
                mode="date"
                placeholder="Date of birth"
                confirmBtnText="OK"
                cancelBtnText="Cancel"
                showIcon={false}
                maxDate={maxDate}
                onDateChange={(date) => {
                  dismissKeyboard()
                  this.setState({ date })
                }}
                customStyles={{
                  placeholderText: {
                    color: Colors.black,
                    fontSize: 14,
                    alignSelf: 'flex-start',
                  },
                  dateInput: {
                    flex: 1,
                    height: 40,
                    borderWidth: 1,
                    borderColor: Colors.container,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.navBar,
                  },
                  dateText: {
                    color: Colors.black,
                    fontSize: 14,
                    alignSelf: 'flex-start',
                  },
                }}
              />
            </View>
          </View>
          <View style={{ marginBottom: 40 }}>
            <TouchableOpacity
              onPress={this.gotoHome}
              style={[styles.loginbutton, { alignSelf: 'center' }]}
            >
              <Text style={styles.signin}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Footer />
      </View>
    )
  }
}

EditProfile.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  profileImage: PropTypes.string,
  dispatch: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    name: state.ValEdu.get('name'),
    email: state.ValEdu.get('email'),
    profileImage: state.ValEdu.get('profileImage'),
    dob: state.ValEdu.get('dob'),
    age: state.ValEdu.get('age'),
  }
}

export default connect(mapStateToProps)(EditProfile)
