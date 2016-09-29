const config = {
  api: {
    baseUrl: 'http://172.16.1.134:8990/api/',
    token: 'Account/RegisterUser',
    login: 'Account/LoginUser',
    profileInfo:'ProfileInfo/FetchProfileInfo',
    updateProfile:'ProfileInfo/UpdateProfileInfo',
    getContent:'Content/FetchContent',
    sendotp:'SMS/SendSMS',
  },
}
export default function getServiceUrl(endpointKey) {
  return config.api.baseUrl + config.api[endpointKey]
}
