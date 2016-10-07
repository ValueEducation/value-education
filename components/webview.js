import React, { Component } from 'react';
import {
  WebView,
  View,
} from 'react-native';

export default class WebviewHtml extends Component {
  render() {
    const htmlContent = '<div style="background-color:rgb(234,251,253);height:1000px;margin:-10;padding:5">' + this.props.htmlContent + '</div>'
    return (
      <View style={{ height: 1000 }}>
        <WebView source={{ html: htmlContent }} />
      </View>
    )
  }
}
