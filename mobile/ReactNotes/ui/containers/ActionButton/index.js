import { View, StyleSheet } from 'react-native'
import React, { Component, PropTypes } from 'react'

import { ListItem, Toolbar } from 'react-native-material-ui'

import routes from 'ReactNotes/ui/routes'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})


export default class ActionButtonSpec extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  }

  render() {
    const {navigator, route} = this.props
    return (
        <View style={styles.container}>
            <Toolbar
                leftElement="arrow-back"
                onLeftElementPress={() => navigator.pop()}
                centerElement={route.title}
            />
            <ListItem
                divider
                centerElement="With toolbar transition"
                onPress={() => navigator.push(routes.actionButtonToolbar)}
            />
            <ListItem
                divider
                centerElement="With speed dial transition"
                onPress={() => navigator.push(routes.actionButtonSpeedDial)}
            />
        </View>
    )
  }
}