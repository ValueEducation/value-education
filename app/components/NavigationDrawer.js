import React, { Component } from 'react'
import Drawer from 'react-native-drawer'
import { Actions, DefaultRenderer } from 'react-native-router-flux'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import HomeScreen from './HomeScreen'
import SideTabContent from './SideTabContent'

export default class NavigationDrawer extends Component {
  state={
    drawerOpen: false,
    drawerDisabled: false,
  }

  closeDrawer = () => {
    dismissKeyboard()
    this.refs.navigation.close()
  }

  openDrawer = () => {
    dismissKeyboard()
    this.refs.navigation.open()
  }
  
  render() {
    const state = this.props.navigationState
    const children = state.children
    return (
      <Drawer
        ref="navigation"
        onOpen={() => {
          // alert('onopen')
          this.setState({ drawerOpen: true })
        }}
        onClose={() => {
          // alert('onclose')
          this.setState({ drawerOpen: false })
        }}
        type="overlay"
        content={<SideTabContent closeDrawer={this.closeDrawer} />}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan={true}
        tweenDuration={75}
        tweenHandler={(ratio) => ({ main: { opacity: Math.max(0.54, 1 - ratio) } })}
      >
        <HomeScreen openMenu={this.openDrawer} closeMenu={this.closeDrawer}/>
      </Drawer>
    )
  }
}
