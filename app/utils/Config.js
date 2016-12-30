const config = {
  api: {
    localUrl: 'http://172.16.1.134:8990/',
    publicUrl: 'http://103.255.144.120:8888/',
    token: 'api/Account/RegisterUser',
    profileInfo: 'api/ProfileInfo/FetchProfileInfo',
    updateProfile: 'api/ProfileInfo/UpdateProfileInfo',
    sendotp: 'api/SMS/SendSMS',
    saveDeviceRegId: 'api/Device/SaveDeviceInfo',
    toggleNotification: 'api/Device/ToggleNotification',
    reftreshToken: '/Token',
    fetchNextRecords: 'api/Content/FetchScroll',
    searchRecords: 'api/Content/SearchKeyword',
    fetchContentListByDate: 'api/Content/FetchContentListByDate',
    deleteAccount: 'api/Account/UserAccountDelete',
    reactivateAccount: 'api/Account/ReactivateAccount',
    saveFeedback: 'api/FeedbackInfo/SaveUserFeedback',
    updateUserSubscription: 'api/SubscriptionsInfo/UserSubscriptionsUpdate',
    fetchUserSubscription: 'api/SubscriptionsInfo/FetchUserSubscriptions',
    fetchContentByTid: 'api/Content/FetchContentByTid',
    mobileLogin: 'api/Account/MobileLogin',
    fetchAppVersion: 'api/Content/FetchLatestAppVersion',
  },
}
export default function getServiceUrl(endpointKey) {
  return config.api.publicUrl + config.api[endpointKey]
}

//    login: 'api/Account/LoginUser',
//    getContent: 'api/Content/FetchContent',   
//    viewThoughts: 'api/Content/FetchAllThoughts',
//    viewVideos: 'api/Content/FetchAllVideos',
//    viewStories: 'api/Content/FetchAllStories',
//    viewImages: 'api/Content/FetchAllImages',
    
