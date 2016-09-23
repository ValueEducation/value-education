'use strict';

import React, { Component } from 'react';

import {
  WebView,
  View,
} from 'react-native';

export default class WebviewHtml extends Component {
  render() {
    return (
	  <View style={{height:1000}}> 
      	<WebView source={{html: this.props.htmlContent}} />
      </View>
    );
  }
}
