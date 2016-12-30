import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  StatusBar,
  Image,
  NetInfo,
  Platform,
  CameraRoll,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import GoogleAnalytics from 'react-native-google-analytics-bridge'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import YouTube from 'react-native-youtube'
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux'
import Toast from 'react-native-root-toast'
import Carousel from 'react-native-carousel'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import VideoPlayer from './VideoPlayer'
import { getRefreshToken } from './refreshToken'
import {
  frequency,
  contentInfo,
  startSpinner,
  stopSpinner,
  dateChange,
  enableThought,
  enableImage,
  enableStory,
  enableVideo,
} from '../actions/ValEduActions'
import http from '../utils/Http'
import styles from '../utils/Styles'
import Colors from '../utils/Colors'

let RNFS = require('react-native-fs')
let freq
let i = 0
let contentRows = []
let position = 0
let refreshToken
let token
let userId

GoogleAnalytics.setTrackerId('UA-81365729-4')
GoogleAnalytics.setDispatchInterval(10)
GoogleAnalytics.trackScreenView('Home')

class ContentScreen extends Component {

  constructor(props) {
    super(props)  
    this.state = {
      contentList: [],
      tIdList: [],
      date : this.props.date,
      position: null,
    };
  }

  componentDidMount() {
    this.getContentListByDate()
  }
  
  handleChangeTab = ({ i, ref, from }) => {
    if (i === 0) {
      GoogleAnalytics.trackEvent('ThoughtofDay', 'content')
    } else if (i === 1) {
      GoogleAnalytics.trackEvent('ImageofDay', 'content')
    } else if (i === 2) {
      GoogleAnalytics.trackEvent('StoryofDay', 'content')
    } else if (i === 3) {
      GoogleAnalytics.trackEvent('VideoofDay', 'content')
    }
  }

  getContentListByDate = async () => {
    try {
      token = await AsyncStorage.getItem('token')
      userId = await AsyncStorage.getItem('userId')
      refreshToken = await AsyncStorage.getItem('refreshToken')
    }
    catch(e) {

    }
    //alert(this.props.date)
    const date = this.props.date
    let day = date.getDate()
    if (day < 10) {
      day = '0' + day
    }
    let month = date.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    const year = date.getFullYear()
    const contentDate = year + '-' + month + '-' + day

    NetInfo.fetch().done((reach) => {
      if(reach == 'NONE') {
        alert('No Internet Connection')
      }
      else {
        AsyncStorage.getItem('token')
        .then((value) => {   
          http('fetchContentListByDate', {userId, date: contentDate}, 'POST', value)
          .then((response) => {
            // alert( 'response' + JSON.stringify(response))
            if(response.Message) {
              getRefreshToken()
              this.getContentListByDate()          
            } else if(!response.isActive) {
              AsyncStorage.multiRemove(['token', 'registerToken','showBdayScreen','refreshToken','name','email','profileImage','phoneNumber','birthDate'])
              Actions.welcome()
            } else if(response.status && response.contentList) {
              this.setState({contentList: response.contentList})
              contentRows = response.contentList
              let tIds = []
              if(contentRows) {
                for(i = 0; i < contentRows.length; i++) {
                  tIds.push(contentRows[i].tId)
                  if(this.props.contentTitle === contentRows[i].title) {
                    position = i
                    this.setState({position: i})
                  }
                }
              }
              this.setState({tIdList: tIds})
              this.getContentByDate(this.state.position)
            } else {
                //alert('no Data found')
                const { dispatch } = this.props    
                dispatch(contentInfo(null, null, null, null, null))
                this.setState({contentList: []})
              }
          })
          .catch((error) => {
            alert(error)
          })       
        })
      }
    })
  }

  getContentByDate = (position) => {
    let data = contentRows[position]
    if(data) {
    const thought = data.thought
    const image = data.image
    const story = data.story
    let video = data.video
    const title = data.title
    if(video) {
      video = video.split('v=')[1]
    }
    const { dispatch } = this.props    
    dispatch(contentInfo(thought, image, story, video, title))
  }
  }

  dateChange = (date) => {
    this.setState({ date })
    const datec = new Date(this.state.date)
    const { dispatch } = this.props
    dispatch(dateChange(datec))
    this.getContentListByDate(datec)
  }

  decrementDate = () => {
    const date = new Date(this.state.date)
    date.setDate(date.getDate() - 1)
    this.setState({ date })
    const { dispatch } = this.props
    dispatch(dateChange(date))
    this.getContentListByDate(date)
  }

  incrementDate = () => {
    const date = new Date(this.state.date)
    date.setDate(date.getDate() + 1)
    this.setState({ date })
    const { dispatch } = this.props
    dispatch(dateChange(date))
    this.getContentListByDate(date)
  }

  saveSubscription = async () => {   
    try {
      userId = await AsyncStorage.getItem('userId')
      token = await AsyncStorage.getItem('token')
    }
    catch(e) { }
    let data = {
      userId,
      thoughtSubscribed: this.props.isThought ? 1 : 0,
      imageSubscribed: this.props.isImage ? 1 : 0,
      storySubscribed: this.props.isStory ? 1 : 0,
      videoSubscribed: this.props.isVideo ? 1 : 0,  
    }

    http('updateUserSubscription',data,'POST',token)
    .then((response) => {
       // alert( 'response' + JSON.stringify(response))
        if(response.Message) {
          getRefreshToken()
          this.saveSubscription()
        } else if (!response.isActive) {
          AsyncStorage.multiRemove(['token', 'registerToken','showBdayScreen','refreshToken','name','email','profileImage','phoneNumber','birthDate'])
          Actions.welcome()
        } else if (response.status) {
        let toast = Toast.show('Content type updated successfully', {
          duration: 500,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      } else {
         alert('error')
      }
    })
    .catch((error) => {
      alert(error)
    })
  }

  render() {
    let rows = []
    if(this.state.contentList) {
      rows = this.state.contentList.map((r, i) => {
        return (
          <View style={styles.carouselContainer}>
            <Text style={styles.textColor}>{r.title}</Text>
          </View>
        )
      })
    }

    return (
      <View style={[styles.container, { paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0 }]}>
        <StatusBar
          backgroundColor={Colors.statusBar}
          barStyle="light-content"
        />
        <View style={[styles.homeNavBar,{paddingTop: Platform.OS == 'ios' ? 20 : 5}]}>
          <TouchableOpacity underlayColor="transparent" onPress={() => Actions.pop()} style={{padding:10}}>   
            <Icon name="angle-left" color={Colors.white} size={30} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={this.decrementDate}>
              <Icon name="caret-left" color="white" size={25} />
            </TouchableOpacity>
            <DatePicker
              style={{ width: 110, marginHorizontal: 5 }}
              date={this.state.date}
              mode="date"
              placeholder="Date of birth"
              format="MMM DD YYYY"
              confirmBtnText="OK"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={this.dateChange}
              customStyles={{
                placeholderText: {
                  color: '#fff',
                  fontSize: 15,
                },
                dateInput: {
                  flex: 1,
                  height: 40,
                  borderWidth: 1,
                  borderColor: 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                dateText: {
                  color: '#fff',
                  fontSize: 17,
                },
              }}
            />
            <TouchableOpacity onPress={this.incrementDate}>
              <Icon name="caret-right" color="white" size={25} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity underlayColor="transparent" onPress={this.onSearchClick} style={{padding:10}}>
            <Icon name="search" color={Colors.navBar} size={20} />
          </TouchableOpacity>           
          </View>
          {this.state.position !== null ? 
            <Carousel
              hideIndicators={false}
              indicatorColor={Colors.thought}
              indicatorSize={25}
              indicatorSpace={30}
              inactiveIndicatorColor={Colors.navBar}
              inactiveIndicatorText= '•'
              indicatorText= '•'
              animate={false}
              delay={1000}
              onPageChange={this.getContentByDate}
              indicatorAtBottom={true}
              indicatorOffset={-10}
              initialPage={this.state.position}
            >
             {rows}
            </Carousel>:<View />
          }      
        <ScrollableTabView
          style={{ marginTop: 10 }}
          renderTabBar={() => <DefaultTabBar />}
          tabBarPosition="bottom"
          tabBarBackgroundColor={Colors.navBar}
          tabBarActiveTextColor={Colors.white}
          tabBarInactiveTextColor={Colors.gray}
          onChangeTab={this.handleChangeTab}
        >
          <View style={styles.tabContent} tabLabel="Thought">
          <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={true}>
              {this.props.isThought ? 
                <View>
                {this.props.success ?
                  <View>
                    <Text style={styles.textColor}>{this.props.thought ? this.props.thought : "Thought is not available"}</Text> 
                  </View> :
                <Spinner visible={true} color={Colors.navBar} overlayColor={'transparent'} />
                }
                </View> : 
                <View>
               <Text style={[styles.textColor, {marginBottom: 15}]}>You are not subscribed to Thought</Text>
            <Text style={styles.textColor}>Please subscribe <Text style= {{color: Colors.thought}} onPress={() => {
              const { dispatch } = this.props
              dispatch(enableThought(true))
              this.saveSubscription()
            }}>here</Text></Text>
            </View>
              }
            </ScrollView>
          </View>

          <View style={styles.tabContent} tabLabel="Image">
          {this.props.isImage ? 
            <View>
            
            { this.props.success ?
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={true}>
                {this.props.image ?
                <View>
                <TouchableOpacity              
                  style={{ alignSelf: 'flex-end' }}
                  onPress={() => {
                    if(Platform.OS === 'ios') {
                      let uri = 'data:image/jpeg;base64,' + this.props.image
                      let promise = CameraRoll.saveToCameraRoll(uri)
                      promise.then((result) => {
                        let toast2 = Toast.show('Image is saved in CameraRoll', {
                          duration: 500,
                          position: Toast.positions.BOTTOM,
                          shadow: true,
                          animation: true,
                          hideOnPress: true,
                          delay: 0,
                        });
                      }).catch((error) => {
                        alert('save failed ' + error)
                      })
                    } else {
                      let path = RNFS.ExternalStorageDirectoryPath + '/ValueEducation'
                      RNFS.mkdir(path)
                      path = path + '/' + this.props.title + '.png'
                      RNFS.writeFile(path, this.props.image, 'base64')
                      .then(() => {
                        let toast3 = Toast.show('Image is saved in Internal Storage', {
                          duration: 500,
                          position: Toast.positions.BOTTOM,
                          shadow: true,
                          animation: true,
                          hideOnPress: true,
                          delay: 0,
                        });
                      })
                      .catch((err) => {
                        alert(err.message)
                      })
                    }}
                  }
                >
                  <Icon name="download" color={Colors.navBar} size={20} />
                </TouchableOpacity>         
                <Image
                  source={{ uri: 'data:image/jpeg;base64,' + this.props.image, isStatic: true }}
                  style={{
                    height: 200,
                    resizeMode: 'contain',
                  }}
                />
                </View> : 
                <Text style={styles.textColor}>Image is not available</Text> }                
              </ScrollView> :
              <Spinner visible={true} color={Colors.navBar} overlayColor={'transparent'} />
            }</View> :
            <View>
          <Text style={[styles.textColor, {marginBottom: 15}]}>You are not subscribed to Image</Text>
            <Text style={styles.textColor}>Please subscribe <Text style= {{color: Colors.thought}} onPress={() => {
              const { dispatch } = this.props
              dispatch(enableImage(true))
              this.saveSubscription()
            }}>here</Text></Text>
            </View>
        }
          </View>

          <View style={styles.tabContent} tabLabel="Story">
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={true}>
              {this.props.isStory ? 
                <View>
                {this.props.success ?
                  <View>
                    <Text style={styles.textColor}>{this.props.story ? this.props.story : "Story is not available"}</Text> 
                  </View> :
                <Spinner visible={true} color={Colors.navBar} overlayColor={'transparent'} />
                }
                </View> : 
                <View>
               <Text style={[styles.textColor, {marginBottom: 15}]}>You are not subscribed to Story</Text>
            <Text style={styles.textColor}>Please subscribe <Text style= {{color: Colors.thought}} onPress={() => {
              const { dispatch } = this.props
              dispatch(enableStory(true))
              this.saveSubscription()
            }}>here</Text></Text>
            </View>
              }
            </ScrollView>
          </View> 

          <View style={styles.tabContent} tabLabel="Video">
          {this.props.isVideo ? 
            <View>
            { this.props.success ?
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={true}>
                { this.props.video ?
                <VideoPlayer video={this.props.video}/> : 
                <Text style={styles.textColor}>Video is not available</Text> }
              </ScrollView> :
              <Spinner visible={true} color={Colors.navBar} overlayColor={'transparent'} />
            }</View> : 
            <View>
          <Text style={[styles.textColor, {marginBottom: 15}]}>You are not subscribed to Video</Text>
            <Text style={styles.textColor}>Please subscribe <Text style= {{color: Colors.thought}} onPress={() => {
              const { dispatch } = this.props
              dispatch(enableVideo(true))
              this.saveSubscription()
            }}>here</Text></Text>
            </View>
          }
          </View>
        </ScrollableTabView>
      </View>
    )
  }
}

ContentScreen.propTypes = {
  dispatch: PropTypes.object,
  video: PropTypes.string,
  success: PropTypes.bool,
  thought: PropTypes.string,
  story: PropTypes.string,
  image: PropTypes.string,
  frequency: PropTypes.number,
  title: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    frequency: state.ValEdu.get('frequency'),
    thought: state.ValEdu.get('thought'),
    image: state.ValEdu.get('image'),
    story: state.ValEdu.get('story'),
    video: state.ValEdu.get('video'),
    title: state.ValEdu.get('title'),
    date: state.ValEdu.get('date'),
    success: state.ValEdu.get('success'),
    isThought: state.ValEdu.get('isThought'),
    isImage: state.ValEdu.get('isImage'),
    isStory: state.ValEdu.get('isStory'),
    isVideo: state.ValEdu.get('isVideo'),
  }
}

export default connect(mapStateToProps)(ContentScreen)


{/*<Carousel pageStyle={{
          backgroundColor: "white",
          borderRadius: 5,
          justifyContent:'center',
          alignItems:'center',
          height: 40,
          marginBottom: 0,
        }}
        onPageChange={this.getContentByDate}
        initialPage={this.state.position}
        >
         {rows}
        </Carousel>*/}