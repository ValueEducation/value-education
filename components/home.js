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
import Video from 'react-native-video'
import Icon from 'react-native-vector-icons/FontAwesome'
import DatePicker from 'react-native-datepicker'
import WebviewHtml from './webview'
import http from '../utils/http'
import styles from '../utils/styles'
import background from '../videos/small.mp4'
import VideoPlayer from './VideoPlayer'
import GoogleAnalytics from 'react-native-google-analytics-bridge'
import YouTube from 'react-native-youtube'

GoogleAnalytics.setTrackerId('UA-81365729-4')
GoogleAnalytics.setDispatchInterval(10)
GoogleAnalytics.trackScreenView('Home')

export default class Home extends Component {
  constructor(props) {
    super(props)
    const date = new Date()
    date.setDate(date.getDate()-6);
    this.state = {
      contentText: '',
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
    }
  }
  componentDidMount = () => {
    const date = this.state.date
    this.getContentbyDate(date)
    const url = 'https://www.youtube.com/watch?v=OxWy3oTVoag'
    var video_id = url.split('v=')[1];
    const ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    //this.refs.youtubePlayer.seekTo(10);
    /*const day = date.getDate();
      const monthIndex = date.getMonth()+1;
      const year = date.getFullYear();
      const currentDate = (year + '-' + monthIndex + '-23')*/
  }

  getContentbyDate = (date) => {
     AsyncStorage.getItem('token')
    .then((value) => {
      http('getContent',{"date": "2016-09-23"},'POST',value)
        .then((response) => {
        //  alert("content "+JSON.stringify(response))
        if(response.status){
          const contentText = response.thought         
          const thought = response.thought
          const image = response.image
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
    const thought = this.state.thought    
  //  const html = '<h1 align="center" style="font-size:20px">Heading</h1><p style="color:rgb(17, 150, 182)">paragraph 1</p><p style="color:rgb(17, 150, 182)">paragraph 2</p><p style="color:rgb(17, 150, 182)">paragraph 3</p>'
    this.setState({ contentText: thought })
    GoogleAnalytics.trackEvent('ThoughtofDay', 'content');
  }
  ImageofDay = () => {
    const image = this.state.image
  //  const html = '<h1>This is a Heading</h1><p>This is a paragraph.</p>'
    this.setState({contentText: image })
    GoogleAnalytics.trackEvent('ImageofDay', 'content');
  }
  StoryofDay = () => {
    const story = this.state.story
    /*const html = '<h1>This is a Heading</h1><p>This is a paragraph.Clipping views enables you to easily change the shape of a view. You can clip views for consistency with other design elements or to change the shape of a view in response to user input. You can clip a view to its outline area using the View.setClipToOutline() method or the android:clipToOutline attribute. Only rectangle, circle, and round rectangle outlines support clipping'
      + 'as determined by the Outline.canClip() method.'
      + 'You can create oval and rectangular outlines with rounded corners using the methods in the Outline class.'
      + 'The default outline provider for views obtains the outline from the views background. To prevent a view from casting a shadow, set its outline provider to null To clip a view to the shape of a drawable, set the drawable as the background of the view (as shown above) and call the View.setClipToOutline() method.'
      + 'Clipping views is an expensive operation, so do not animate the shape you use to clip a view. To achieve this effect, use the Reveal </p>'*/
    this.setState({contentText: story })
    GoogleAnalytics.trackEvent('StoryofDay', 'content');
  }
  VideoofDay = () => {
    const video = this.state.video   
  //  const html = '<h1>This is a Heading</h1><h1>This is a Heading</h1><h1>This is a Heading</h1><h1>This is a Heading</h1><p>This is a paragraph.</p>'
    this.setState({ contentText: video})
    GoogleAnalytics.trackEvent('VideoofDay', 'content');
  }
  Search = () => {
    Actions.search()
  }
  selectDate = () => {
    
  }
  render() {
    return (
      <View style={styles.welcomeContainer}>
        <View style={[styles.container1,{height:55,backgroundColor:'rgb(17, 150, 182)'}]}>
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

        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 100, marginTop: 20,paddingLeft:10,paddingRight:10 }}>
          <View style={styles.container2}>
            <TouchableHighlight underlayColor="transparent" onPress={this.ThoughtofDay}>
              <View style={styles.box}>
                <Text style={styles.text}>Thought of the day</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight underlayColor="transparent" onPress={this.ImageofDay}>
              <View style={styles.box}>
                <Text style={styles.text}>Image of the day</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight underlayColor="transparent" onPress={this.StoryofDay}>
              <View style={styles.box}>
                <Text style={styles.text}>Story of the day</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight underlayColor="transparent" onPress={this.VideoofDay}>
              <View style={styles.box}>
                <Text style={styles.text}>Video of the day</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.container3}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <YouTube
                ref="youtubePlayer"
                videoId="OxWy3oTVoag"
                play={true}
                hidden={true}
                playsInline={true}
                loop={false}
                onReady={(e)=>{this.setState({isReady: true})}}
                onChangeState={(e)=>{this.setState({status: e.state})}}
                onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
                onError={(e)=>{this.setState({error: e.error})}}
                onProgress={(e)=>{this.setState({currentTime: e.currentTime, duration: e.duration})}}
                style={{alignSelf: 'stretch', height: 200}}
                apiKey="AIzaSyBZ-IdHbbuUVLp5g3xAuy-HzwwsLdbuK68"
              />
              <TouchableHighlight onPress={()=>{this.setState((s) => {return {isPlaying: !s.isPlaying};} )}}>
               <Text style={{fontSize: 20, textAlign: 'center', margin: 10, color: 'blue'}}>{this.state.status == 'playing' ? 'Pause' : 'Play'}</Text>
              </TouchableHighlight>
              <Text style={styles.instructions}>{this.state.isReady ? 'Player is ready.' : 'Player setting up...'}</Text>
              <Text style={styles.instructions}>Status: {this.state.status}</Text>
              <Text style={styles.instructions}>Quality: {this.state.quality}</Text>
              <Text style={styles.instructions}>{this.state.error ? 'Error: ' + this.state.error : ' '}</Text>
              <WebviewHtml htmlContent={this.state.contentText} />            
            </ScrollView>
          </View>
        </View>        
      </View>
    );
  }
}
{ /*
<VideoPlayer volume={0.5} />
<Icon name="angle-left" color="rgb(17, 150, 182)" size={30}/>
<Icon name="angle-right" color="rgb(17, 150, 182)" size={30}/>
<Icon name="hand-o-left" color="rgb(17, 150, 182)" size={30}/>
<Icon name="hand-o-right" color="rgb(17, 150, 182)" size={30}/>
<Video
  source={background} // Can be a URL or a local file.
  rate={1.0}                   // 0 is paused, 1 is normal.
  volume={1.0}                 // 0 is muted, 1 is normal.
  muted={false}                // Mutes the audio entirely.
  paused={false}               // Pauses playback entirely.
  resizeMode="cover"           // Fill the whole screen at aspect ratio.
  repeat={false}                // Repeat forever.
  playInBackground={false}     // Audio continues to play when aentering background.
  playWhenInactive={false}     // [iOS] Video continues to play whcontrol or notification center are shown.
  style={styles.backgroundVideo}
/>*/ }
{/*<Text style={{ color: 'black', alignSelf: 'center', fontSize: 20 }}>Content</Text>
              <Text style={styles.text}>{this.state.contentText}</Text>
              <Image
                style={{ width: 80, height: 80 }}
                resizeMode="contain"
                source={this.state.contentImageSource}
              />*/}
