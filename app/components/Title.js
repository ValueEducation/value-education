import React, { Component, PropTypes } from 'react'

import {
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'

import {
  dateChange,
  startSpinner,
  stopSpinner,
  contentInfo,
} from '../actions/ValEduActions'
import styles from '../utils/Styles'
import http from '../utils/Http'

const maxDate = new Date()

class Title extends Component {
  constructor(props) {
    super(props)
    const date = this.props.date
    this.state = { date }
  }

  getContentbyDate = (date) => {
    const { dispatch } = this.props
    dispatch(startSpinner())
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const datec = year + '-' + month + '-' + day

    AsyncStorage.getItem('token')
    .then((value) => {
      http('getContent', { date: datec }, 'POST', value)
      .then((response) => {
        dispatch(stopSpinner())
        if (response.status) {
          const thought = response.contentInfo.thought
          const image = response.contentInfo.image
          const story = response.contentInfo.story
          let video = response.contentInfo.video
          video = video.split('v=')[1]
          dispatch(contentInfo(thought, image, story, video))
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
    })
  }

  decrementDate = () => {
    const date = new Date(this.state.date)
    const minDate = new Date('September 27, 2016')
    if (date > minDate) {
      date.setDate(date.getDate() - 1)
      this.setState({ date })
      const { dispatch } = this.props
      dispatch(dateChange(date))
      // this.getContentbyDate(date)
    }
  }

  incrementDate = () => {
    const date = new Date(this.state.date)
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 1)
    if (date < currentDate) {
      date.setDate(date.getDate() + 1)
      this.setState({ date })
      const { dispatch } = this.props
      dispatch(dateChange(date))
      // this.getContentbyDate(date)
    }
  }

  dateChange = (date) => {
    this.setState({ date })
    const datec = new Date(this.state.date)
    const { dispatch } = this.props
    dispatch(dateChange(datec))
    this.getContentbyDate(datec)
  }

  render() {
    return (
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={this.decrementDate}>
          <Icon name="caret-left" color="white" size={30} />
        </TouchableOpacity>
        <DatePicker
          style={{ width: 110, marginHorizontal: 5 }}
          date={this.state.date}
          mode="date"
          placeholder="Date of birth"
          format="MMM DD YYYY"
          minDate="sep 27 2016"
          maxDate={maxDate}
          confirmBtnText="OK"
          cancelBtnText="Cancel"
          showIcon={false}
          onDateChange={this.dateChange}
          customStyles={{
            placeholderText: {
              color: '#fff',
              fontSize: 15,
            },
            dateInput: {
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            },
            dateText: {
              color: '#fff',
              fontSize: 17,
            },
          }}
        />
        <TouchableOpacity onPress={this.incrementDate}>
          <Icon name="caret-right" color="white" size={30} />
        </TouchableOpacity>
      </View>
    )
  }
}

Title.propTypes = {
  dispatch: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    date: state.ValEdu.get('date'),
    success: state.ValEdu.get('success'),
  }
}

export default connect(mapStateToProps)(Title)
