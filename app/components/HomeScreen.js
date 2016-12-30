import React, { Component, PropTypes } from 'react'
import {
  View,
  ListView,
  AsyncStorage,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  NetInfo,
  Platform,
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import { getRefreshToken } from './refreshToken'

import {
  startSpinner,
  stopSpinner,
  records,
  dateChange,
} from '../actions/ValEduActions'
import http from '../utils/Http'
import styles from '../utils/Styles'
import Colors from '../utils/Colors'

const PushNotification = require('react-native-push-notification')

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
let i = 0
let recordsExist = true
let registerToken
let token
let userId
let statusText = ''
let showBdayScreen
let refreshToken
const noImageIcon = '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'

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: this.getListViewData(),
      tag: '',
      isRecords: true,
      search: false,
    }
    // getRefreshToken()   
  }

  componentDidMount = async () => {
    let birthDate
    try {
      showBdayScreen = await AsyncStorage.getItem('showBdayScreen')
      birthDate = await AsyncStorage.getItem('birthDate')
    } catch (e) { }
    if (!showBdayScreen) {
      showBdayScreen = 'notShown'
    }
    
    const date = new Date()    
    let day = date.getDate()
    if (day < 10) {
      day = '0' + day
    }
    let month = date.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    const year = date.getFullYear()
    const datec = month + '-' + day

    const birthDay = new Date(birthDate)
    day = birthDay.getDate()
    if (day < 10) {
      day = '0' + day
    }
    month = birthDay.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    const dateb = month + '-' + day
    const { dispatch } = this.props
    if (showBdayScreen === 'notShown' || showBdayScreen === 'true') {
      if (dateb === datec) {
        AsyncStorage.setItem('showBdayScreen', 'false')
        setTimeout(() => {
          Actions.birthday()
        }, 100)
      } else {
        AsyncStorage.setItem('showBdayScreen', 'notShown')
        dispatch(startSpinner())
      }
    } else {
      dispatch(startSpinner())
    }
    this.configurePush()
    this.getContent()
  }
  getListViewData = () => {
    let dataList = []
    const {rows} = this.props
    rows.map(row => {
      let rowData = {}
      rowData.title = row.get('title')
      rowData.image = row.get('image')
      rowData.video = row.get('video')
      rowData.story = row.get('story')
      rowData.thought = row.get('thought')
      rowData.createdOn = row.get('createdOn')
      dataList.push(rowData)
    })
    return dataList
  }

  configurePush = async () => {
    const { dispatch } = this.props   
    try {
      registerToken = await AsyncStorage.getItem('registerToken')
      token = await AsyncStorage.getItem('token')
      userId = await AsyncStorage.getItem('userId')
    }
    catch (error) { }
    // alert(registerToken)
    PushNotification.configure({
      onRegister(result) {
        if (!registerToken) {
          AsyncStorage.setItem('registerToken', result.token)
          const data = {
            userId,
            deviceToken: result.token,
            isNotificationEnabled: true,
            platform: result.os,
          }
          if (token) {
            NetInfo.fetch().done((reach) => {
              if (reach === 'NONE') {
                alert('No Internet Connection')
              } else {
                http('saveDeviceRegId', data, 'POST', token)
                .then((response) => {
                  if(response.Message) {
                    getRefreshToken()
                  } else if (!response.isActive) {
                    AsyncStorage.multiRemove(['token', 'registerToken','showBdayScreen','refreshToken','name','email','profileImage','phoneNumber','birthDate'])
                    Actions.welcome()
                  } else if (response.status) {
                    console.log('push notifications registered successfully')
                  } else {
                    console.log('push notifications not registered')
                  }
                })
                .catch((error) => {
                  alert(error)
                })
              }
            })
          }
        }
      },

      onNotification(notification) {
        // alert(JSON.stringify(notification))
        if (notification.data.routeKey === 'birthday') {
          if(showBdayScreen === 'notShown') {
            Actions.birthday()
          }
        } else if (notification.data.routeKey === 'content_update') {
          const contentDate = new Date(notification.data.contentDate)
          dispatch(dateChange(contentDate))
          Actions.contentscreen({contentTitle: notification.data.contentTitle})
        }
      },

      senderID: '402074549643',
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: token ? true : false,
    })
  }

  getContent = async () => {
    try {
      token = await AsyncStorage.getItem('token')
      userId = await AsyncStorage.getItem('userId')
      refreshToken = await AsyncStorage.getItem('refreshToken')
    }
    catch (e) { }
    // alert(token)
    NetInfo.fetch().done((reach) => {
      if (reach === 'NONE') {
        alert('No Internet Connection')
      } else {
        http('fetchNextRecords', { currentCount: i, type: 'all', userId }, 'POST', token)
        .then((response) => {
          // alert(JSON.stringify(response))
          setTimeout(() => {
            SplashScreen.hide()
          }, 500)
          const { dispatch } = this.props
          dispatch(stopSpinner())
          if(response.Message) {
            getRefreshToken()
            this.getContent()
          } else if (!response.isActive) {
            AsyncStorage.multiRemove(['token', 'registerToken','showBdayScreen','refreshToken','name','email','profileImage','phoneNumber','birthDate'])
            Actions.welcome()
          } else if (response.status && response.recordList) {
            i = i + 10
            this.setState({ rows: this.state.rows.concat(response.recordList) })
            dispatch(records(this.state.rows))
          }
          if (response.status && !response.recordList) {
            recordsExist = false
          }
        })
        .catch((error) => {
          alert(error)
        })
      }
    })
  }

  getNextRecords = () => {
    if (this.refs.listview.scrollProperties.offset +
      this.refs.listview.scrollProperties.visibleLength >=
      this.refs.listview.scrollProperties.contentLength && recordsExist && !this.state.search) {
      this.getContent()
    }
  }

  searchRecords = async () => {
    try {
      token = await AsyncStorage.getItem('token')
      userId = await AsyncStorage.getItem('userId')
    }
    catch (e) {}
    const { dispatch } = this.props
    http('searchRecords', { searchkey: this.state.tag, type: 'all', userId }, 'POST', token)
    .then((response) => {
      if(response.Message) {
        getRefreshToken()
        this.searchRecords()
      } else if (!response.isActive) {
        AsyncStorage.multiRemove(['token', 'registerToken','showBdayScreen','refreshToken','name','email','profileImage','phoneNumber','birthDate'])
        Actions.welcome()
      } else if (response.status && response.searchList) {
        this.setState({ isRecords: true })
        dispatch(records(response.searchList))         
      } else {
        this.setState({ isRecords: false })
      }
    })
    .catch((error) => {
      alert(error)
    })
  }

  search = () => {
    dismissKeyboard()
    if (this.state.tag) {
      this.searchRecords()
    } else {
      const { dispatch } = this.props
      dispatch(records(this.state.rows))
    }
  }

  onChangeTag = (tag) => {
    this.setState({ tag })
    const newRows = []
    let row = 0
    const data = this.state.rows
    for (row = 0; row < data.length; row++) {
      let thoughtSearchkey = data[row].thoughtSearchkey
      let storySearchkey = data[row].storySearchkey
      let imageSearchkey = data[row].imageSearchkey
      let videoSearchkey = data[row].videoSearchkey
      if (!thoughtSearchkey) {
        thoughtSearchkey = ''
      }
      if (!storySearchkey) {
        storySearchkey = ''
      }
      if (!imageSearchkey) {
        imageSearchkey = ''
      }
      if (!videoSearchkey) {
        videoSearchkey = ''
      }
      if (thoughtSearchkey.toLowerCase().indexOf(tag.toLowerCase()) !== -1
        || storySearchkey.toLowerCase().indexOf(tag.toLowerCase()) !== -1
        || imageSearchkey.toLowerCase().indexOf(tag.toLowerCase()) !== -1
        || videoSearchkey.toLowerCase().indexOf(tag.toLowerCase()) !== -1) {
        newRows.push(data[row])
      }
    }
    if (newRows) {
      this.setState({ isRecords: true })
      const { dispatch } = this.props
      dispatch(records(newRows))
    } else {
      this.setState({ isRecords: false })
    }
  }

  renderRowElement = (rowData, sectionID, rowID) => {
    let date = new Date(rowData.createdOn)
    let source = { uri: 'data:image/jpeg;base64,' + noImageIcon, isStatic: true }
    if (rowData.image) {
      source = { uri: 'data:image/jpeg;base64,' + rowData.image, isStatic: true }
    }
    date = date.toUTCString()
    date = date.split(' ').slice(0, 4).join(' ')
    let currentDate = new Date()
    currentDate = currentDate.toUTCString()
    currentDate = currentDate.split(' ').slice(0, 4).join(' ')
    if (rowID == 0) {
      const thought = rowData.thought
      const image = rowData.image
      const story = rowData.story
      if (thought) {
        statusText = 'Thought of the day'
      } else if (story) {
        statusText = 'Story of the day'
      } else if (image) {
        statusText = 'image of the day'
      } else {
        statusText = 'video of the day'
      }
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              const { dispatch } = this.props
              const contentDate = new Date(rowData.createdOn)
              dispatch(dateChange(contentDate))
              Actions.contentscreen({contentTitle: rowData.title})
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginBottom: 10,
                paddingHorizontal: 20,
              }}>
              <Text style={styles.title}></Text>
              <Text style={styles.date}>{ date }</Text>
            </View>
            <View 
              style={[
                styles.listItem,
                  { height: 140, backgroundColor: Colors.footer }
                ]
              }>                    
              <View style={styles.thought}>
                <Text
                  style={{
                    color:Colors.white,
                    fontStyle:'italic',
                    alignSelf:'center',
                  }}
                >{statusText}</Text>
              </View>
              <Image
                source={source}
                style={styles.contentPic}
              />
              <View style={styles.listContent}>                     
                <Text style={[styles.title, { marginBottom: 10 }]}>{ rowData.title }</Text>
                <Text
                  numberOfLines={6}
                  style={{ lineHeight: 25, fontFamily: Platform.OS == 'ios' ? 'helvetica neue' : 'roboto', fontSize: 14}}
                >
                  {rowData.thought ? rowData.thought : rowData.story}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.listItem}>
          <Image
            source={source}
            style={styles.contentPic}
          />
          <View style={styles.listContent}>
            <TouchableOpacity               
              onPress={() => {
                const { dispatch } = this.props
                let contentDate = new Date(rowData.createdOn)
                dispatch(dateChange(contentDate))
                Actions.contentscreen({contentTitle: rowData.title})
              }}
            >
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
                <Text style={styles.title}>{ rowData.title }</Text>
                <Text style={styles.date}>{ date }</Text>
              </View>
              <Text numberOfLines={1} style={{ lineHeight: 25, fontFamily: Platform.OS == 'ios' ? 'helvetica neue' : 'roboto', fontSize: 14 }}>
                {rowData.thought ? rowData.thought : rowData.story}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  onSearchClick = () => {
    this.setState({ search: true })
    setTimeout(() => {
      this.refs.tag.focus()
    }, 50)   
  }

  render() {
    if (this.props.success) {      
      return (      
        <View style={[styles.container, { paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0 }]}>
          <StatusBar
            backgroundColor={Colors.statusBar}
            barStyle="light-content"
          />
          { this.state.search ?           
          <View style={[styles.homeNavBar, { backgroundColor: Colors.white, paddingTop: Platform.OS === 'ios' ? 20 : 5 }]}>
            <TouchableOpacity style={{padding:10}} onPress={() => {
              this.setState({tag: '', search: false, isRecords: true})             
              dismissKeyboard()
              const { dispatch } = this.props
              dispatch(records(this.state.rows))
            }}>
              <Icon name="arrow-left" color={Colors.brown} size={20} />
            </TouchableOpacity>
            <TextInput
              ref="tag"
              style={{ width: 230, fontSize: 16 }}
              onChangeText={this.onChangeTag}
              underlineColorAndroid ="transparent"
              placeholder="Search Records.."
              value={this.state.tag}
              maxLength={25}
            />
           <TouchableOpacity onPress={this.search} style={{ padding:10 }}>
              <Icon name="search" color={Colors.brown} size={20} />
            </TouchableOpacity>
          </View> :
          <View style={[styles.homeNavBar, { paddingTop: Platform.OS === 'ios' ? 20 : 5 }]}>
            <TouchableOpacity onPress={() => this.props.openMenu()} style={{ padding:10 }}>
              <Icon name="bars" color={Colors.white} size={20} />
            </TouchableOpacity>
            <Text style={{ color: Colors.white, fontSize: 20, fontWeight: 'bold', fontFamily: Platform.OS == 'ios' ? 'helvetica neue' : 'roboto' }}>Home</Text>
            <TouchableOpacity onPress={this.onSearchClick} style={{ padding: 10 }}>
              <Icon name="search" color={Colors.white} size={20} />
            </TouchableOpacity>
          </View>
        }
          { this.state.isRecords ? 
            <ListView
              ref="listview"
              dataSource={ds.cloneWithRows(this.getListViewData())}
              onScroll={this.getNextRecords}
              onEndReachedThreshold={2000}
              automaticallyAdjustContentInsets={false}
              renderRow={this.renderRowElement}
              renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
                /*if(rowID === 0) {
                  return <View />
                }*/
                return(
                  <View
                    style={{
                      height: adjacentRowHighlighted ? 4 : 1,
                      backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                      marginLeft: 60,
                    }}
                  />
                )
              }}
            /> :
            <View style={styles.container}>
              <Text style={[styles.textColor, { alignSelf: 'center' }]}>No Data Found</Text>
            </View> }
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor={Colors.statusBar}
            barStyle="light-content"
          />
          <Spinner visible={true} color={Colors.navBar} overlayColor={'transparent'} />
        </View>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    success: state.ValEdu.get('success'),
    isVisible: state.ValEdu.get('isVisible'),
    rows: state.ValEdu.get('rows'),
    date: state.ValEdu.get('date'),
  }
}

HomeScreen.propTypes = {
  dispatch: PropTypes.object,
}

export default connect(mapStateToProps)(HomeScreen)
