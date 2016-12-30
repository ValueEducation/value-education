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
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import GoogleAnalytics from 'react-native-google-analytics-bridge'
import { startSpinner, stopSpinner } from '../../actions/ValEduActions'
import styles from '../../utils/Styles'
import profileIcon from '../../images/default.gif'
import http from '../../utils/Http'
import { validateEmail } from '../../utils/Validations'
import Colors from '../../utils/Colors'
import Footer from '../Footer'

const { width } = Dimensions.get('window')
const maxDate = new Date()
class ProfileInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      date: '',
      source: profileIcon,
      emailError: '',
      base64: '',
      errorText: '',
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
      const { dispatch } = this.props
      dispatch(startSpinner())
      this.setState({ errorText: '' })
      const data = {
        email: this.state.email,
        name: this.state.name,
        phoneNumber: this.props.phoneNumber,
        birthDate: this.state.date,
        profileImage: this.state.base64,
      }
      NetInfo.fetch().done((reach) => {
        if (reach === 'NONE') {
          alert('No Internet Connection')
        } else {
          http('token', data)
          .then((response) => {
            dispatch(stopSpinner())
            if (response.access_token && response.status) {
              AsyncStorage.setItem('token', response.access_token)
              AsyncStorage.setItem('refreshToken', response.refresh_token)
              AsyncStorage.setItem('userId', response.userId)
              AsyncStorage.setItem('name', data.name)
              AsyncStorage.setItem('email', data.email)
              AsyncStorage.setItem('birthDate', data.birthDate)
              AsyncStorage.setItem('profileImage', data.profileImage)
              AsyncStorage.setItem('phoneNumber', this.props.phoneNumber)
              GoogleAnalytics.trackEvent('Registration', 'new user')
              // this.configurePush()
              Actions.drawer()
            } else {
              alert('error occured' + JSON.stringify(response))
            }
          })
          .catch((error) => {
            alert(error)
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={true}
        >
          <Text style={styles.errorText}>{this.state.errorText}</Text>
          <Text style={styles.textColor}>Please provide your Name, Email, Date of Birth
            and Optional Photo for Profile information.
          </Text>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: 15 }}>
            <View>
              <TouchableOpacity onPress={this.openGallery}>
                <Image
                  source={this.state.source}
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
                  autoFocus={true}
                  placeholderTextColor={Colors.black}
                  underlineColorAndroid={Colors.navBar}
                  returnKeyType="next"
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
                  placeholderTextColor={Colors.black}               
                  underlineColorAndroid={Colors.navBar}
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
                maxDate={maxDate}
                showIcon={false}
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
                Next
              </Text>
            </TouchableOpacity>
            { this.props.success ? <View /> :
              <Spinner visible={true} color={Colors.navBar} overlayColor={'transparent'} />}
          </View>
        </ScrollView>
        <Footer />
      </View>
    )
  }
}

ProfileInfo.propTypes = {
  success: PropTypes.bool,
  dispatch: PropTypes.object,
  phoneNumber: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    success: state.ValEdu.get('success'),
  }
}
export default connect(mapStateToProps)(ProfileInfo)
