import React, { Component, PropTypes } from 'react'
import {
  Text,  
  View,
} from 'react-native'

import styles from './styles'

export default class NoteScreen extends Component {

  render () {
    return (
      <View style={styles.container}>
        <Text>Create Note Screen!</Text>
      </View>
    ) 
  }
}