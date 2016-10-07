'use strict';

import React, { Component, PropTypes } from 'react'

import {
  StyleSheet,
  View,
  ListView,
  AsyncStorage,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native'
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import http from '../../utils/http'
import styles from '../../utils/styles'
const { height, width } = Dimensions.get('window')
var i = 0
export default class ImageView extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});    
    this.state = {dataSource: ds.cloneWithRows(['row 1', 'row 2']),SECTIONS:[]}
  }

  componentDidMount = () => {
    let SECTIONS = []
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     AsyncStorage.getItem('token')
    .then((value) => {
      http('viewImages',{},'POST',value)
        .then((response) => {
        if(response.status){
          for(i=0; i<response.imageList.length; i++) {
            let date = new Date(response.imageList[i].contentDate).toUTCString()
            date = date.split(' ').slice(0, 4).join(' ')
            const content = response.imageList[i].image
            SECTIONS.push({title:date, content:content})
            // this.setState({ dataSource: ds.cloneWithRows(response.imageList) })
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
        <Animatable.Image
          source={{uri: 'data:image/jpeg;base64,/' + section.content, isStatic: true}}
          style={{
            height: 200,
            width: width-100,
            borderColor: 'rgb(17, 150, 182)',
            borderWidth: 0.5,
            marginTop:7,
            resizeMode: 'contain',
            margin: 10,
          }}
          duration={300}
          easing="ease-out"
          animation={isActive ? 'zoomIn' : false}>
        </Animatable.Image>
      </Animatable.View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
       {/* <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return(
            <Image
              source={{uri: 'data:image/jpeg;base64,/' + rowData.image, isStatic: true}}
              style={{
                height: 200,
                width: width-20,
                borderColor: 'rgb(17, 150, 182)',
                borderWidth: 0.5,
                marginTop:7,
                resizeMode: 'contain',
                margin: 10,
              }}
            />)
          }}
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
