'use strict';

import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  ListView,
  AsyncStorage,
  Text,
  ScrollView,
} from 'react-native'
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import http from '../../utils/http'
import styles from '../../utils/styles'
var i = 0
export default class Story extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});    
    this.state = {dataSource: ds.cloneWithRows(['row 1', 'row 2']), SECTIONS: []}
  }

  componentDidMount = () => {
    var SECTIONS = []
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     AsyncStorage.getItem('token')
    .then((value) => {
      http('viewStories',{},'POST',value)
        .then((response) => {
        if(response.status){
          for(i=0; i<response.storyList.length; i++) {
            let date = new Date(response.storyList[i].contentDate).toUTCString()
            date = date.split(' ').slice(0, 4).join(' ')
            const content = response.storyList[i].story
            SECTIONS.push({title:date, content:content})
          //  this.setState({ dataSource: ds.cloneWithRows(response.storyList) })
          }
        }
        this.setState({SECTIONS})
      })
      .catch((error) => {
        alert(error)
      })
    })
  }
  _renderHeader(section, index, isActive) {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={[styles.header, { backgroundColor: (isActive ? 'rgba(17, 150, 182, 1)' : 'rgba(234,251,253,1)') }]}>
        <Text style={[styles.headerText,{ color: (isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(0,0,0,1)')}]}>{section.title}</Text>
      </Animatable.View>
    );
  }

  _renderContent(section, i, isActive) {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={[styles.content,{ backgroundColor: (isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(234,251,253,1)') }]}>
        <Animatable.Text
          style={{ color: 'black' }}
          duration={300}
          easing="ease-out"
          animation={isActive ? 'zoomIn' : false}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {/*<ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={styles.text}>{rowData.story}</Text>}
        />*/}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Accordion
            sections={this.state.SECTIONS}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </ScrollView>
      </View>
    )
  }
}
