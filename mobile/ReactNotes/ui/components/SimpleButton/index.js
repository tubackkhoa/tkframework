import React, { Component, PropTypes } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default class SimpleButton extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    customText: PropTypes.string,
  }

  render () {
    const {onPress, customText} = this.props
    return (
      <TouchableOpacity onPress={onPress}>
        <View>
          <Text>{customText || 'SimpleButton'}</Text>
        </View>
      </TouchableOpacity>
    ) 
  }
}