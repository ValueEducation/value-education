const config = {
  api: {
    baseUrl: 'http://172.16.1.134:8990/api/',
    token: 'Account/RegisterUser',
    login: 'Account/LoginUser',
    profileInfo:'ProfileInfo/FetchProfileInfo',
    updateProfile:'ProfileInfo/UpdateProfileInfo',
    getContent:'Content/FetchContent',
    sendotp:'SMS/SendSMS',
    viewThoughts:'Content/FetchAllThoughts',
    viewVideos:'Content/FetchAllVideos',
    viewStories:'Content/FetchAllStories',
    viewImages:'Content/FetchAllImages',
  },
}
export default function getServiceUrl(endpointKey) {
  return config.api.baseUrl + config.api[endpointKey]
}
