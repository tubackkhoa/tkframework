import React, { Component, PropTypes } from 'react'
import { 
  ToastAndroid, 
  ScrollView, 
  Platform 
} from 'react-native'

import routes from 'ReactNotes/ui/routes'
import Container from 'ReactNotes/ui/components/Container'
// components
import { 
    ActionButton, 
    Avatar, 
    ListItem, 
    Toolbar 
} from 'react-native-material-ui'



export default class Home extends Component {

    constructor(props) {
      super(props)

      this.state = {
        selected: [],
        searchText: '',
      }
    }

    static propTypes = {
      navigator: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
    }

    onAvatarPressed = (value) => {
      const { selected } = this.state

      const index = selected.indexOf(value)

      if (index >= 0) {
          // remove item
          selected.splice(index, 1)
      } else {
          // add item
          selected.push(value)
      }

      this.setState({ selected })
    }

    renderToolbar(){
        if (this.state.selected.length > 0) {
            return (
                <Toolbar
                    key="toolbar"
                    leftElement="clear"
                    onLeftElementPress={() => this.setState({ selected: [] })}
                    centerElement={this.state.selected.length.toString()}
                    rightElement={['delete']}
                    style={{
                        container: { backgroundColor: 'white' },
                        titleText: { color: 'rgba(0,0,0,.87)' },
                        leftElement: { color: 'rgba(0,0,0,.54)' },
                        rightElement: { color: 'rgba(0,0,0,.54)' },
                    }}
                />
            )
        }
        return (
            <Toolbar
                key="toolbar"
                leftElement="menu"
                onLeftElementPress={() => this.props.navigator.pop()}
                centerElement={this.props.route.title}
                onPress={() => this.setState({ searchText: '' })}
                searchable={{
                    autoFocus: true,
                    placeholder: 'Search',
                    onChangeText: value => this.setState({ searchText: value }),
                    onSearchClosed: () => this.setState({ searchText: '' }),
                }}
            />
        )
    }

    renderItem (key, route) {
        const searchText = this.state.searchText.toLowerCase()
        const title = route.title
        if (searchText.length > 0 && title.toLowerCase().indexOf(searchText) < 0) {
            return null
        }

        return (
            <ListItem
                key={key} divider
                leftElement={<Avatar text={title[0]} />}
                onLeftElementPress={() => this.onAvatarPressed(title)}
                centerElement={title}
                onPress={() => this.props.navigator.push(route)}
            />

        )
    }


    render() {
        return (
            <Container>
                {this.renderToolbar()}               
                <ScrollView
                    keyboardShouldPersistTaps
                    keyboardDismissMode="interactive"
                >
                    {Object.keys(routes)
                        .filter(key=>key!=='home')
                        .map(key=>this.renderItem(key, routes[key]))
                    }                    
                </ScrollView>  

                <ActionButton
                    actions={[
                        { icon: 'email', label: 'Email' },
                        { icon: 'phone', label: 'Phone' },
                        { icon: 'sms', label: 'Text' },
                        { icon: 'favorite', label: 'Favorite' },
                    ]}
                    icon="share"
                    transition="speedDial"
                    onPress={(action) => {
                        if (Platform.OS === 'android') {
                            ToastAndroid.show(action, ToastAndroid.SHORT)
                        }
                    }}
                />

            </Container>
        )
    }
}

