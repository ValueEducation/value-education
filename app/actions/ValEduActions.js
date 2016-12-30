import actionTypes from './ActionTypes'

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

export function alertsOn(payload) {
  return ({
    type: ALERTS_ON,
    payload,
  })
}

export function alertsOff(payload) {
  return ({
    type: ALERTS_OFF,
    payload,
  })
}

export function frequency(payload) {
  return ({
    type: FREQUENCY,
    payload,
  })
}

export function contentInfo(thought, image, story, video, title) {
  return ({
    type: CONTENT_INFO,
    thought,
    image,
    story,
    video,
    title,
  })
}

export function dateChange(date) {
  return ({
    type: CHANGE_DATE,
    date,
  })
}

export function startSpinner(payload) {
  return ({
    type: START_SPINNER,
    payload,
  })
}

export function stopSpinner(payload) {
  return ({
    type: STOP_SPINNER,
    payload,
  })
}

export function saveProfileInfo(name, email, profileImage, dob, age) {
  return ({
    type: PROFILE_INFO,
    name,
    email,
    profileImage,
    dob,
    age,
  })
}

export function showModal(payload) {
  return ({
    type: SHOW_MODAL,
    payload,
  })
}

export function hideModal(payload) {
  return ({
    type: HIDE_MODAL,
    payload,
  })
}

export function records(rows) {
  // alert(JSON.stringify(rows))
  return ({
    type: RECORDS,
    rows,
  })
}

export function enableThought(payload) {
  return ({
    type: ENABLE_THOUGHT,
    payload,
  })
}

export function enableImage(payload) {
  return ({
    type: ENABLE_IMAGE,
    payload,
  })
}

export function enableStory(payload) {
  return ({
    type: ENABLE_STORY,
    payload,
  })
}

export function enableVideo(payload) {
  return ({
    type: ENABLE_VIDEO,
    payload,
  })
}
