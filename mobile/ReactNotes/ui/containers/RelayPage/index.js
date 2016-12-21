import { 
  Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  ToastAndroid, 
  Platform,
  Image, 
} from 'react-native'

import React, { Component, PropTypes } from 'react'

import { ListItem, Subheader, Toolbar, Avatar } from 'react-native-material-ui'

import Relay, {
  Route,
  DefaultNetworkLayer,
  RootContainer,
} from 'react-relay'

import { API_BASE } from 'ReactNotes/store/constants/api'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image:{
      width: 50, 
      height: 50
    }
})

class RelayPage extends Component {    

    render() {
        const {viewer:{projects:{edges}}, navigator, route} = this.props
        return (
            <View style={styles.container}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => navigator.pop()}
                    centerElement={route.title}
                />
                <ScrollView style={styles.container}>                    
                    <Subheader text="GraphQL Result:" />
                    {edges.map(({node}) => (
                    <ListItem
                      key={node.id}
                      divider
                      leftElement={
                        <Image style={styles.image}
                          source={{uri: `${API_BASE}/${node.full_image}`}}/>
                      }
                      numberOfLines="dynamic"
                      centerElement={{
                          primaryText: node.title,
                          secondaryText: node.caption,
                      }}
                      onPress={() => console.log(node)}
                    />         
                    ))}           
                </ScrollView>
            </View>
        )
    }
}

const RelayPageContainer = Relay.createContainer(RelayPage, {

  initialVariables: {
    first: 10,          
    order: 'updated_at DESC',  
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        projects(first: $first order: $order){
          edges {
            node {
              id
              title
              caption              
              source_url
              full_image
              tags {
                id
                name
              }
            }
          }
          pageInfo {
            hasNextPage           
          }
        }       
      }
    `
  },
})

class RelayPageRoute extends Route {
  static paramDefinitions = {
    first: { required: false },
  }

  static queries = {
    viewer: () => Relay.QL`query { viewer }`,
  }

  static routeName = 'RelayPageRoute'
}

export default class RelayPageSpec extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  }

  render(){
    // pass props to Component
    return (
      <RootContainer
        Component={RelayPageContainer}
        route={new RelayPageRoute({ first: 5 })}
        renderFetched={data=>
          <RelayPageContainer 
            {...this.props}
            {...data}
          />
        }
      />
    )
  }

}





