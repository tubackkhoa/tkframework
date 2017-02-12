import FCM from 'fcm-push'
import apn from 'apn'
import { FIREBASE_AUTH_KEY } from 'config/constants'
import path from 'path'

import { certPath } from 'config/constants'

const IOS_DEVICE = "iOS"
const ANDROID_DEVICE = "Android"
const fcm = new FCM(FIREBASE_AUTH_KEY)

export const apnProvider = new apn.Provider({
  cert: `${certPath}/cert.pem`,
  key: `${certPath}/key.pem`,
  production: true
})

export const pushNotification = (deviceList, title, body, data, cb) => {
  const notification = {title, body}
  deviceList.forEach(({deviceId, deviceType}) => {
    const message = {
      to: deviceId, // required fill with device token or topics      
      data,
      notification,
    }

    if(deviceType === ANDROID_DEVICE){
      pushAndroid(message, cb)
    } else {
      pushIOS(message, cb)
    }    

  })
}

export const pushAndroid = (message, cb) => {
  fcm.send(message, (err, response)=>{
      if (err) {
          console.log("Something has gone wrong!")
      } else {
          console.log("Successfully sent with response: ", response)
          cb && cb(response)
      }
  })
}

export const pushIOS = (message, cb) => {
  const note = new apn.Notification()
  // note.expiry = Math.floor(Date.now() / 1000) + 3600 // Expires 1 hour from now.
  // note.badge = 3
  // note.sound = "ping.aiff"
  note.alert = message.notification.title
  note.payload = message.data
  note.topic = 'net.ecmmedia.Rudicaf' // "<your-app-bundle-id>";
  console.log(message)
  apnProvider.send(note, message.to).then((result) => {
    // see documentation for an explanation of result
    // console.log(result)
    cb && cb(result)
  })
}
