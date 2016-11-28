import { View, StyleSheet } from 'react-native'
import React, { Component, PropTypes } from 'react'


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default class Container extends Component {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
        <View style={styles.container}>
            {this.props.children}
        </View>
    )
  }
}

