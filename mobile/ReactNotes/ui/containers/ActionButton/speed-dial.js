import React, { Component, PropTypes } from 'react'
import Container from 'ReactNotes/ui/components/Container'

import { ActionButton, Toolbar } from 'react-native-material-ui'


export default class ActionButtonSpec extends Component {

  static propTypes = {
      navigator: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
  }

  render() {

    const {navigator, route} = this.props
      return (
          <Container>
              <Toolbar
                  leftElement="arrow-back"
                  onLeftElementPress={() => navigator.pop()}
                  centerElement={route.title}
              />
              <ActionButton
                  actions={['email', { icon: 'phone', label: 'Phone' }, 'sms', 'favorite']}
                  icon="share"
                  transition="speedDial"
              />
          </Container>
      )
  }
}


