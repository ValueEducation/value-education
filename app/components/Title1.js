import React, { Component, PropTypes } from 'react'

import {
  View,
  TouchableOpacity,
  AsyncStorage,
  NetInfo,
  Text,
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux'
import Colors from '../utils/Colors'
import { dateChange } from '../actions/ValEduActions'
import styles from '../utils/Styles'
import http from '../utils/Http'

const maxDate = new Date()
let token
let userId
let i

class Title extends Component {
  constructor(props) {
    super(props)
    const date = this.props.date
    this.state = { date }
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

  getContentListByDate = async () => {
    try {
      token = await AsyncStorage.getItem('token')
      userId = await AsyncStorage.getItem('userId')
    }
    catch (e) {}

    NetInfo.fetch().done((reach) => {
      if (reach === 'NONE') {
        alert('No Internet Connection')
      } else {
        http('fetchContentListByDate', { userId, date: this.props.date }, 'POST', token)
        .then((response) => {
          this.setState({ contentList: response.contentList })
          const rows = response.contentList
          const tIds = []
          for (i = 0; i < rows.length; i++) {
            tIds.push(rows[i].tId)
          }
          this.setState({ tIdList: tIds })
        })
        .catch((error) => {
          alert(error)
        })
      }
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

  dateChange = (date) => {
    this.setState({ date })
    const datec = new Date(this.state.date)
    const { dispatch } = this.props
    dispatch(dateChange(datec))
    this.getContentbyDate(datec)
  }

  render() {
    return (
      <View style={styles.titleView}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={this.decrementDate}>
           {/*<Icon name="angle-left" color={Colors.navBar} size={30} />*/}
            <Text style={[styles.textColor, { color: Colors.navBar, fontSize: 16 }]}>Prev</Text>
          </TouchableOpacity>
          <DatePicker
            style={{ width: 110 }}
            date={this.state.date}
            mode="date"
            placeholder="Date of birth"
            format="MMM DD YYYY"
            minDate="nov 1 2016"
            maxDate={maxDate}
            confirmBtnText="OK"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={this.dateChange}
            customStyles={{
              placeholderText: {
                color: Colors.navBar,
                fontSize: 14,
              },
              dateInput: {
                height: 30,
                borderWidth: 1,
                borderColor: Colors.navBar,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -20,
                marginHorizontal: 5,
              },
              dateText: {
                color: Colors.navBar,
                fontSize: 14,
              },
            }}
          />
          <TouchableOpacity onPress={this.incrementDate}>
         {/*   {<Icon name="angle-right" color={Colors.navBar} size={30} />}*/}
            <Text style={[styles.textColor, { color: Colors.navBar, fontSize: 16 }]}>Next</Text>
          </TouchableOpacity>
        </View>
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
