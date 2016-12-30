import KeyMirror from 'keymirror'

const ActionTypes = new KeyMirror({
  ALERTS_ON: null,
  ALERTS_OFF: null,
  FREQUENCY: null,
  CONTENT_INFO: null,
  CHANGE_DATE: null,
  START_SPINNER: null,
  STOP_SPINNER: null,
  PROFILE_INFO: null,
  SHOW_MODAL: null,
  HIDE_MODAL: null,
  RECORDS: null,
  ENABLE_THOUGHT: null,
  ENABLE_IMAGE: null,
  ENABLE_STORY: null,
  ENABLE_VIDEO: null,
})

Object.freeze(ActionTypes)

export default ActionTypes
