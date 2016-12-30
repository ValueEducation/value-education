import React, { Component, PropTypes } from 'react'
import YouTube from 'react-native-youtube'

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: true,
    }
  }

  onError = (e) => {
    this.setState({ error: e })
    // alert(e.nativeEvent.error)
  }

  render() {
    return (
      <YouTube
        ref="youtubePlayer"
        videoId={this.props.video}
        play={true}
        hidden={true}
        playsInline={true}
        loop={false}
        onError={this.onError}
        onReady={(e) => {
          // alert('ready' + e.nativeEvent.target)
          this.setState({ isReady: true })
        }}
        onChangeState={(e) => {
          // alert('state' + e.nativeEvent.state)
          this.setState({ status: e.state })
        }}
        style={{ alignSelf: 'stretch', height: 230, marginTop: 10 }}
        apiKey="AIzaSyCOOscfwpYUbO7PkG1gsop40PCUZmCjkVA"
      />
    )
  }
}

VideoPlayer.propTypes = {
  video: PropTypes.string,
}
