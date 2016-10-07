import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Dimensions,
  AsyncStorage,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import DatePicker from 'react-native-datepicker'
import http from '../utils/http'
import styles from '../utils/styles'
import GoogleAnalytics from 'react-native-google-analytics-bridge'
import YouTube from 'react-native-youtube'
import TabNavigator from 'react-native-tab-navigator'

GoogleAnalytics.setTrackerId('UA-81365729-4')
GoogleAnalytics.setDispatchInterval(10)
GoogleAnalytics.trackScreenView('Home')
var video_id
const { height, width } = Dimensions.get('window')

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    const date = new Date()
    date.setDate(date.getDate()-6);
    this.state = {
      date,
      thought: '',
      image: '',
      story: '',
      video: '',
      utubeId: 'gffhgf',
      currentTime:'',
      duration:'',
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: true,
      selectedTab: 'thought',
    }
  }
  componentDidMount = () => {
    const date = this.state.date
    this.getContentbyDate(date)
    const url = 'https://www.youtube.com/watch?v=OxWy3oTVoag'
    video_id = url.split('v=')[1];
    const ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    //this.refs.youtubePlayer.seekTo(10);
  }
  viewAllVideos = () => {
    Actions.video()
  }
  viewAllThoughts = () => {
    Actions.thought()
  }
  viewAllImages = () => {
    Actions.image()
  }
  viewAllStories =() => {
    Actions.story()
  }
  getContentbyDate = (date) => {
     AsyncStorage.getItem('token')
    .then((value) => {
      http('getContent',{"date": "2016-09-23"},'POST',value)
        .then((response) => {
        if(response.status){
          const contentText = response.thought         
          const thought = response.thought
          const image = { uri: 'data:image/jpeg;base64,/' + response.image, isStatic: true }
          const story = response.story
          const video = response.video
          this.setState({contentText,thought,image,story,video})
        }
      })
      .catch((error) => {
        alert(error)
      })
    })
  }
  decrementDate = () => {
    let date = new Date(this.state.date)
    date.setDate(date.getDate() - 1)
    this.setState({date})
    this.getContentbyDate(date)
  }
  incrementDate = () => {
    let date = new Date(this.state.date)
    date.setDate(date.getDate() + 1)
    this.setState({date})
    this.getContentbyDate(date)
  }
  Settings = () => {
    Actions.settings()
  }
  Profile = () => {
    Actions.profile()
  }
  ThoughtofDay = () => {
    this.setState({ selectedTab: 'thought' })
    GoogleAnalytics.trackEvent('ThoughtofDay', 'content');
  }
  ImageofDay = () => {
    this.setState({ selectedTab: 'image' })
    GoogleAnalytics.trackEvent('ImageofDay', 'content');
  }
  StoryofDay = () => {
    this.setState({ selectedTab: 'story' })
    GoogleAnalytics.trackEvent('StoryofDay', 'content');
  }
  VideoofDay = () => {
    this.setState({ selectedTab: 'video' })
    GoogleAnalytics.trackEvent('VideoofDay', 'content');
  }
  Search = () => {
    Actions.search()
  }
  render() {
    return (
      <View style={styles.welcomeContainer}>
        <View style={[styles.container1, { height: 55, backgroundColor: 'rgb(17, 150, 182)' }]}>
          <TouchableHighlight underlayColor="transparent" onPress={this.Settings}>
            <Icon name="cog" color="white" size={30} />
          </TouchableHighlight>
          <TouchableHighlight underlayColor="transparent" onPress={this.decrementDate}>
            <Icon name="angle-left" color="white" size={30} />
          </TouchableHighlight>
          <DatePicker
            style={{ width: 130, marginLeft: -20, marginRight: -20, marginTop:-5 }}
            date={this.state.date}
            mode="date"
            placeholder="MMM DD YYYY"
            format="MMM DD YYYY"
            minDate="Jul 22nd 1983"
            maxDate="Dec 31st 2016"
            confirmBtnText="OK"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={(date) => { this.setState({date}) }}
            customStyles={{
              placeholderText: {
                color: '#fff',
                fontSize: 17,
              },
              dateInput: {
                flex: 1,
                height: 40,
                borderWidth: 1,
                borderColor: 'rgb(17, 150, 182)',
                alignItems: 'center',
                justifyContent: 'center'
              },
              dateText: {
                color: '#fff',
                fontSize: 17,
              },
            }}
          />
          <TouchableHighlight underlayColor="transparent" onPress={this.incrementDate}>   
            <Icon name="angle-right" color="white" size={30} />
          </TouchableHighlight>
          <TouchableHighlight underlayColor="transparent" onPress={this.Search}>
            <Icon name="search" color="white" size={30} />
          </TouchableHighlight> 
          <TouchableHighlight underlayColor="transparent" onPress={this.Profile}>
            <Icon name="user" color="white" size={30} />
          </TouchableHighlight>     
        </View>

        <TabNavigator tabBarStyle={{paddingBottom:15, backgroundColor:'rgb(17, 150, 182)'}}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'thought'}
          title={"Thought"}
          titleStyle={{color:'white', fontSize:14}}
          selectedTitleStyle={{color:'black', fontSize:14}}
          onPress={this.ThoughtofDay}
        >
          <View>
            <Text style={styles.text}>{this.state.thought}</Text>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.viewAllThoughts}
              style={styles.registerbutton}
            >
              <Text style={styles.registerbuttontext}>
                View all
              </Text>
            </TouchableHighlight>
          </View>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'image'}
          title="Image"
          titleStyle={{color:'white', fontSize:14}}
          selectedTitleStyle={{color:'black', fontSize:14}}
          onPress={this.ImageofDay}
        >
          <View>
            <Image
              source={this.state.image}
              style={{
                height: 200,
                width: width-20,
                borderColor: 'rgb(17, 150, 182)',
                borderWidth: 0.5,
                marginTop:7,
                resizeMode : 'contain',
                margin:10,
              }}
            />
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.viewAllImages}
              style={styles.registerbutton}
            >
              <Text style={styles.registerbuttontext}>
                View all
              </Text>
            </TouchableHighlight>
          </View>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'story'}
          title="Story"
          titleStyle={{color:'white', fontSize:14}}
          selectedTitleStyle={{color:'black', fontSize:14}}
          onPress={this.StoryofDay}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{padding:10}}>
            <Text style={styles.text}>{this.state.story}</Text>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.viewAllStories}
              style={styles.registerbutton}
            >
              <Text style={styles.registerbuttontext}>
                View all
              </Text>
            </TouchableHighlight>
            </View>
            </ScrollView>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'video'}
          title="Video"
          titleStyle={{color:'white', fontSize:14}}
          selectedTitleStyle={{color:'black', fontSize:14}}          
          onPress={this.VideoofDay}
        >
          <View>
            <View style={{ margin:10 }}>
              <YouTube
                ref="youtubePlayer"
                videoId={video_id}
                play={true}
                hidden={true}
                playsInline={true}
                loop={false}
                onReady={(e)=>{this.setState({isReady: true})}}
                onChangeState={(e)=>{this.setState({status: e.state})}}
                onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
                onError={(e)=>{this.setState({error: e.error})}}
                onProgress={(e)=>{this.setState({currentTime: e.currentTime, duration: e.duration})}}
                style={{alignSelf: 'stretch', height: 200, marginTop:10}}
                apiKey="AIzaSyBZ-IdHbbuUVLp5g3xAuy-HzwwsLdbuK68"
              />
              <TouchableHighlight onPress={()=>{this.setState((s) => {return {isPlaying: !s.isPlaying};} )}}>
               <Text style={{fontSize: 20, textAlign: 'center', margin: 10, color: 'blue'}}>{this.state.status == 'playing' ? 'Pause' : 'Play'}</Text>
              </TouchableHighlight>
              <Text style={styles.instructions}>{this.state.isReady ? 'Player is ready.' : 'Player setting up...'}</Text>
              <Text style={styles.instructions}>Status: {this.state.status}</Text>
              <Text style={styles.instructions}>Quality: {this.state.quality}</Text>
              <Text style={styles.instructions}>{this.state.error ? 'Error: ' + this.state.error : ' '}</Text>                       
            </View>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.viewAllVideos}
              style={styles.registerbutton}
            >
              <Text style={styles.registerbuttontext}>
                View all
              </Text>
            </TouchableHighlight>
          </View>
        </TabNavigator.Item>
      </TabNavigator>       
      </View>
    );
  }
}
