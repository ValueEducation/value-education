import Immutable from 'immutable'
import actionTypes from '../actions/ActionTypes'

const {
  ALERTS_ON,
  ALERTS_OFF,
  FREQUENCY,
  CONTENT_INFO,
  CHANGE_DATE,
  START_SPINNER,
  STOP_SPINNER,
  PROFILE_INFO,
  SHOW_MODAL,
  HIDE_MODAL,
  RECORDS,
  ENABLE_THOUGHT,
  ENABLE_IMAGE,
  ENABLE_STORY,
  ENABLE_VIDEO,
} = actionTypes

/* function createInitialState() {
  return Immutable.fromJS({
    alertsOn: true,
    frequency: 15,
  })
} */

const date = new Date()
const initialState = Immutable.fromJS({
  alertsOn: true,
  frequency: 15,
  thought: '',
  image: '',
  story: '',
  video: '',
  title: '',
  date,
  success: true,
  name: '',
  email: '',
  profileImage: '',
  dob: new Date(),
  age: '',
  isVisible: false,
  rows: [],
  isThought: true,
  isImage: true,
  isStory: true,
  isVideo: true,
})
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ALERTS_ON:
      return state.merge({ alertsOn: true })
    case ALERTS_OFF:
      return state.merge({ alertsOn: false })
    case FREQUENCY:
      return state.merge({ frequency: action.payload.frequency })
    case CONTENT_INFO:
      return state.merge({
        thought: action.thought,
        image: action.image,
        story: action.story,
        video: action.video,
        title: action.title,
      })
    case PROFILE_INFO:
      return state.merge({
        name: action.name,
        email: action.email,
        profileImage: action.profileImage,
        dob: action.dob,
        age: action.age,
      })
    case CHANGE_DATE:
      return state.merge({ date: action.date })
    case START_SPINNER:
      return state.merge({ success: false })
    case STOP_SPINNER:
      return state.merge({ success: true })
    case SHOW_MODAL:
      return state.merge({ isVisible: true })
    case HIDE_MODAL:
      return state.merge({ isVisible: false })
    case RECORDS:
      return state.merge({ rows: action.rows })
    case ENABLE_THOUGHT:
      return state.merge({ isThought: action.payload })
    case ENABLE_IMAGE:
      return state.merge({ isImage: action.payload })
    case ENABLE_STORY:
      return state.merge({ isStory: action.payload })
    case ENABLE_VIDEO:
      return state.merge({ isVideo: action.payload })
    default:
      return state
  }
}
