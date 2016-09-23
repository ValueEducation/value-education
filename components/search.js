/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ListView,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import profileIcon from '../images/default.gif'
import styles from '../utils/styles'

export default class Search extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { text:'',dataSource: ds.cloneWithRows([]) };
  }

  Search = () => {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })    
    if (this.state.text) {
      this.setState({ dataSource: ds.cloneWithRows(['row1', 'row2', 'row1', 'row2', 'row1', 'row2', 'row1', 'row2']) })
    } else {
      this.setState({ dataSource: ds.cloneWithRows([]) })
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        placeholder='Enter your text'
        value={this.state.email}
        keyboardType="email-address"
        onBlur={this.emailOnBlur}
      />
      <TouchableHighlight underlayColor='transparent' onPress={this.Search} style={styles.loginbutton}> 
        <Text style={styles.signin}>Search</Text>
      </TouchableHighlight>

      <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={{borderBottomColor:'green',borderBottomWidth:1,padding:5,flex:1,flexDirection:'row'}}>
              <Text style={styles.textColor}>{rowData}</Text>
            </View>
          }
        />

      </View>
    )
  }
}

