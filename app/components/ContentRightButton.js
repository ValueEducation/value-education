import React, { Component, PropTypes } from 'react'

import {
  View,
  AsyncStorage,
  NetInfo,
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import {
  startSpinner,
  stopSpinner,
  contentInfo,
} from '../actions/ValEduActions'
import http from '../utils/Http'

const maxDate = new Date()
let token
let userId

class ContentRightButton extends Component {
  constructor(props) {
    super(props)
    const date = this.props.date
    this.state = { date }
  }

  getContentbyDate = async (date) => {
    try {
      token = await AsyncStorage.getItem('token')
      userId = await AsyncStorage.getItem('userId')
    } catch (e) { }

    NetInfo.fetch().done((reach) => {
      if (reach === 'NONE') {
        alert('No Internet Connection')
      } else {
        const { dispatch } = this.props
        dispatch(startSpinner())
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const datec = year + '-' + month + '-' + day
        http('fetchContentListByDate', { date: datec, userId }, 'POST', token)
        .then((response) => {
          dispatch(stopSpinner())
          if (response.status) {
            const thought = response.contentInfo.thought
            const image = response.contentInfo.image
            const story = response.contentInfo.story
            let video = response.contentInfo.video
            const title = response.contentInfo.title
            video = video.split('v=')[1]
            let date1 = date
            date1.setDate(date.getDate() + 1)
            date1 = date1.toUTCString()
            date1 = date1.split(' ').slice(0, 4).join(' ')
            dispatch(contentInfo(thought, image, story, video, title, date1))
            Actions.refresh({ title })
          } else {
            alert(response.Message)
             /*if (response.statusText == "Unauthorized") {
              const data = 'grant_type=refresh_token&refresh_token=' + refreshToken + '&client_id='
              http('reftreshToken', data , 'POST')
              .then((response) => {
                alert(JSON.stringify(response))
                AsyncStorage.setItem('token', response.access_token)
                AsyncStorage.setItem('refreshToken', response.refresh_token)
                AsyncStorage.setItem('userId', response.userId)
              }).catch((error) => { alert(error) })
            }*/
          }
        })
        .catch((error) => {
          alert(error)
        })
      }
    })
  }

  dateChange = (date) => {
    this.setState({ date })
    const datec = new Date(this.state.date)
    /*const { dispatch } = this.props
    dispatch(dateChange(datec))*/
    this.getContentbyDate(datec)
  }

  render() {
    return (
      <View style={{ marginTop: -10 }}>
        <DatePicker
          style={{ width: 50 }}
          date={this.state.date}
          mode="date"
          placeholder="Date of birth"
          format="MMM DD YYYY"
          minDate="nov 11 2016"
          maxDate={maxDate}
          confirmBtnText="OK"
          cancelBtnText="Cancel"
          onDateChange={this.dateChange}
          customStyles={{
            placeholderText: {
              fontSize: 0,
            },
            dateInput: {
              height: 0,
              borderWidth: 0,
            },
            dateText: {
              fontSize: 0,
            },
          }}
        />
      </View>
    )
  }
}

ContentRightButton.propTypes = {
  dispatch: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    date: state.ValEdu.get('date'),
    success: state.ValEdu.get('success'),
  }
}

export default connect(mapStateToProps)(ContentRightButton)
