import React from 'react'
import { connect } from 'react-redux'
import ValueEducation from '../components/Main'

function ValEduApp(props) {
    // alert(props.isVideo)
  return <ValueEducation />
}

function mapStateToProps(state) {
  return {
    alertsOn: state.ValEdu.get('alertsOn'),
    frequency: state.ValEdu.get('frequency'),
    thought: state.ValEdu.get('thought'),
    image: state.ValEdu.get('image'),
    story: state.ValEdu.get('story'),
    video: state.ValEdu.get('video'),
    title: state.ValEdu.get('title'),
    date: state.ValEdu.get('date'),
    success: state.ValEdu.get('success'),
    name: state.ValEdu.get('name'),
    email: state.ValEdu.get('email'),
    profileImage: state.ValEdu.get('profileImage'),
    dob: state.ValEdu.get('dob'),
    age: state.ValEdu.get('age'),
    isVisible: state.ValEdu.get('isVisible'),
    rows: state.ValEdu.get('rows'),
    isThought: state.ValEdu.get('isThought'),
    isImage: state.ValEdu.get('isImage'),
    isStory: state.ValEdu.get('isStory'),
    isVideo: state.ValEdu.get('isVideo'),
  }
}

export default connect(mapStateToProps)(ValEduApp)
