import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
  AsyncStorage,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import GoogleAnalytics from 'react-native-google-analytics-bridge'
import { connect } from 'react-redux'
import Share from 'react-native-share'
import styles from '../utils/Styles'
import Colors from '../utils/Colors'
import Footer from './Footer'
import { saveProfileInfo } from '../actions/ValEduActions'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const base64 = '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'
const shareOptions = {
  title: 'Value Education',
  message: 'Download the app at ',
  url: 'https://play.google.com/store/apps/details?id=com.UCMobile.intl',
  subject: 'Share App',
}

let phoneNumber

class SideTabContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: ds.cloneWithRows([
        { name: 'Account', icon: 'key', action: 'account' },
        { name: 'Settings', icon: 'cog', action: 'settings' },
        { name: 'About Value Education', icon: 'book', action: 'aboutus' },
        { name: 'Share Value Education App', icon: 'share-alt', action: 'share' },
        { name: 'Help & Feedback', icon: 'question-circle-o', action: 'help' },
      ]),
      phoneNumber: null,
    }
  }

  componentDidMount = async () => {
    try {
      phoneNumber = await AsyncStorage.getItem('phoneNumber')
    }
    catch(e) {

    }
    this.setState({phoneNumber})
    AsyncStorage.multiGet(['name', 'email', 'birthDate', 'profileImage']).then((values) => {
      const date2 = new Date()
      const date1 = new Date(values[2][1])
      const timeDiff = Math.abs(date2.getTime() - date1.getTime())
      const age = Math.ceil(timeDiff / (1000 * 3600 * 24 * 365))
      let source = base64
      if (values[3][1]) {
        source = values[3][1]
      }
      const { dispatch } = this.props
      dispatch(saveProfileInfo(values[0][1], values[1][1], source, values[2][1], age))
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white, paddingBottom: 40 }}>
        <TouchableOpacity
          onPress={() => {
            this.props.closeDrawer()
            Actions.editprofile()
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingTop: 20,
              paddingBottom: 40,
              paddingHorizontal: 15,
              backgroundColor: Colors.footer,
              borderBottomColor: 'rgb(215, 220, 209)',
              borderBottomWidth: 0.5,
            }}
          >
            <Image
              source={{ uri: 'data:image/jpeg;base64,' + this.props.profileImage, isStatic: true }}
              style={{
                height: 100,
                width: 100,
                borderColor: Colors.navBar,
                borderWidth: 0.5,
                borderRadius: 50,
              }}
            />
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Text style={[styles.textColor, { fontSize: 18 }]}>{this.props.name}</Text>
              <Text style={[styles.textColor, { fontSize: 12, marginTop: 10 }]}>
              {this.props.email}</Text>
              <Text style={[styles.textColor, { fontSize: 12, marginTop: 10 }]}>
              {this.state.phoneNumber}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.closeDrawer()
                    if (rowData.action === 'settings') {
                      Actions.settings()
                    } else if (rowData.action === 'aboutus') {
                      Actions.aboutus()
                    } else if (rowData.action === 'account') {
                      Actions.account()
                    } else if (rowData.action === 'help') {
                      Actions.help()
                    } else if (rowData.action === 'share') {
                      setTimeout(() => {
                        Share.open(shareOptions).then((info) => {
                          GoogleAnalytics.trackEvent('AppShared', 'share')
                          // alert(info)
                        }).catch((err) => {
                          console.log(err)
                        });
                      }, 60)
                    }
                  }}
                  style={[styles.button, { padding: 15, borderBottomColor: Colors.footer }]}
                >
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Icon name={rowData.icon} Color={Colors.navBar} size={20} />
                    <Text style={[styles.textColor, { marginLeft: 20 }]}>{rowData.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          }}
        />
        <Footer />
      </View>
    )
  }
}

SideTabContent.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  profileImage: PropTypes.string,
  dispatch: PropTypes.object,
  closeDrawer: PropTypes.func,
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

export default connect(mapStateToProps)(SideTabContent)
