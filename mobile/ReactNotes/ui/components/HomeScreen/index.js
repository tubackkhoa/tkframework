import React, { Component, PropTypes } from 'react'
import {
  Text,  
  View,
} from 'react-native'

import styles from './styles'

export default class HomeScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text onPress={()=>console.log('vai')}>Home</Text>
      </View> 
    )
  } 
}