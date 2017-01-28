import { Platform } from 'react-native'

// 10.0.2.2 for default Android Simulator
const LOCAL_IP = '192.168.1.23/'// Platform.OS === 'ios' ? '127.0.0.1' : '10.0.3.2'

export const API_BASE = __DEV__ ? `http://${LOCAL_IP}:3333` : 'http://react.agiletech.vn'
export const API_TIMEOUT = 10000