import React from 'react'
import {
  Text,  
  View,
} from 'react-native'

import SimpleButton from 'ReactNotes/ui/components/SimpleButton'
import styles from './styles'

export default {
  LeftButton(route, navigator, index, navState) {
    switch(route.name) {
      case 'createNote':
        return (
          <SimpleButton
            onPress={() => navigator.pop()}
            customText='Back'
          />
        )
      default:
        return null
    }
  },
  RightButton(route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (
          <View style={styles.container}>
             <SimpleButton
               onPress={() => navigator.push({name:'createNote'})}
               customText='Create Note'
             />
          </View>
        )
      default:
        return null
    }
  },
  Title(route, navigator, index, navState) {
    switch(route.name){
      case 'home':
        return (
          <Text>React Notes</Text>
        )
      case 'createNote':
        return (
          <Text>Create Note</Text>
        )
    }
  } 
}