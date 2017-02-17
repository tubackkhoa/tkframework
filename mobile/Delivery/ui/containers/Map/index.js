import { Text, View, StyleSheet, ScrollView, Platform } from 'react-native'
import React, { Component, PropTypes } from 'react'

import { ListItem, Subheader, Toolbar, Button, Icon } from 'react-native-material-ui'

import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps'
import MapView from 'react-native-maps'

import Container from 'Delivery/ui/components/Container'

const styles = StyleSheet.create({
    container: {
       ...StyleSheet.absoluteFillObject,              
       justifyContent: 'flex-end',
       alignItems: 'center',
     },
     map: {
       ...StyleSheet.absoluteFillObject,
       height:400,
     },     
})



export default class MapSpec extends Component {

    static propTypes = {
        navigator: PropTypes.object.isRequired,
        route: PropTypes.object.isRequired,
    }

    render() {
        return (
            <Container >
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigator.pop()}
                    centerElement={this.props.route.title}
                />
                
                <View style={styles.container}>
                    <MapView
                         provider={PROVIDER_GOOGLE}
                         style={styles.map}
                         region={{
                           latitude: 20.941305,
                           longitude: 105.90358,
                           latitudeDelta: 0.015,
                           longitudeDelta: 0.0121,
                         }}
                    />

                    <View style={{
                      flex: 1,
                      height: 50,
                      justifyContent: 'flex-end',
                      marginBottom:200,                      
                    }}>

                    <Button style={{
                        container:{
                          borderRadius:20,
                        }
                     }}   
                            upperCase={false}
                                raised
                                primary
                                text="Receiver"
                                icon="phone"
                            />

                            

                    </View>
                </View>
                
            </Container>
        )
    }
}


