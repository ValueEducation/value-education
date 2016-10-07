'use strict';

import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  ListView,
  AsyncStorage,
  Text,
  TouchableHighlight,
} from 'react-native'
import YouTube from 'react-native-youtube'

import http from '../../utils/http'
import styles from '../../utils/styles'
var video_id
export default class Video extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});    
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     AsyncStorage.getItem('token')
    .then((value) => {
      http('viewVideos',{},'POST',value)
        .then((response) => {
        if(response.status){
          this.setState({ dataSource: ds.cloneWithRows(response.videoList) })
        }
      })
      .catch((error) => {
        alert(error)
      })
    })
  }
  renderRow = (rowData) => {
    return (
      <Text style={styles.text}>{rowData.video}</Text>                       
    )
  }
  render() {
    return (
      <View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    </View>
    )
  }
}
