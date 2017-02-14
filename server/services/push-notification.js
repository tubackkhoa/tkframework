import FCM from 'fcm-push'
import apn from 'apn'
import { FIREBASE_AUTH_KEY } from 'config/constants'
import path from 'path'

import { certPath, APP_BUNDLE_ID } from 'config/constants'

const IOS_DEVICE = "iOS"
const ANDROID_DEVICE = "Android"
const fcm = new FCM(FIREBASE_AUTH_KEY)

export const apnProvider = new apn.Provider({
  cert: `${certPath}/cert.pem`,
  key: `${certPath}/key.pem`,
  production: true
})

/**
 *
 * return chunks object like {iOs:[], Android:[]}
 *
 */

export const getChunks = (deviceList, max=100) => {
  const deviceMap = {}  
  const check = {}
  for (const {deviceId, deviceType} of deviceList) {
    if(check[deviceId])
      continue
    check[deviceId] = true
    if(!deviceMap[deviceType])
      deviceMap[deviceType] = []    
    deviceMap[deviceType].push(deviceId)
  }

  const chunks = {}
  Object.keys(deviceMap).forEach(key => {
    chunks[key] = []
    while(deviceMap[key].length)
      chunks[key].push(deviceMap[key].splice(0, max))
  })

  return chunks
}

export const pushNotification = async (deviceList, title, body, data) => {  
  // if more than 1000 device we will split it out :D
  const chunks = getChunks(deviceList)
  const result = {}
  if(chunks[ANDROID_DEVICE]) 
    result[ANDROID_DEVICE] = await Promise.all(chunks[ANDROID_DEVICE].map(deviceIds => pushAndroid(deviceIds, title, body, data)))
  if(chunks[IOS_DEVICE])
    result[IOS_DEVICE] = await Promise.all(chunks[IOS_DEVICE].map(deviceIds => pushIOS(deviceIds, title, body, data)))
  return result
}

export const pushAndroid = (deviceIds, title, body, data) => {
  const message = {
    registration_ids: deviceIds,
    data,
    notification: {title, body},
  }
  return fcm.send(message).then(message=>JSON.parse(message))
}

export const pushIOS = (deviceIds, title, body, data) => {
  const note = new apn.Notification()
  // note.expiry = Math.floor(Date.now() / 1000) + 3600 // Expires 1 hour from now.
  // note.badge = 3
  // note.sound = "ping.aiff"
  note.alert.title = title
  note.alert.body = body
  note.payload = data
  note.topic = APP_BUNDLE_ID // "<your-app-bundle-id>";
  return apnProvider.send(note, deviceIds)
}

