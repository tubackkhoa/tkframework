import { Text, View, StyleSheet, ScrollView, Platform } from 'react-native'
import React, { Component, PropTypes } from 'react'

import { ListItem, Subheader, Toolbar } from 'react-native-material-ui'

import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps'
import MapView from 'react-native-maps'

import Container from 'ReactNotes/ui/components/Container'

const styles = StyleSheet.create({
    container: {
       ...StyleSheet.absoluteFillObject,
       height: 400,
       width: 400,
       justifyContent: 'flex-end',
       alignItems: 'center',
     },
     map: {
       ...StyleSheet.absoluteFillObject,
     },
})



export default class MapSpec extends Component {

    static propTypes = {
        navigator: PropTypes.object.isRequired,
        route: PropTypes.object.isRequired,
    }

    render() {
        return (
            <Container>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigator.pop()}
                    centerElement={this.props.route.title}
                />
                
                <View style ={styles.container}>
                    <MapView
                        
                         style={styles.map}
                         region={{
                           latitude: 37.78825,
                           longitude: -122.4324,
                           latitudeDelta: 0.015,
                           longitudeDelta: 0.0121,
                         }}
                    />
                </View>
                
            </Container>
        )
    }
}


