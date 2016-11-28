import React, { Component } from 'react'
import { Navigator, NativeModules, StatusBar, View } from 'react-native'

import { COLOR, ThemeProvider } from 'react-native-material-ui'
import routes from 'ReactNotes/ui/routes'
import Container from 'ReactNotes/ui/components/Container'

const UIManager = NativeModules.UIManager

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
        accentColor: COLOR.pink500,
    },
}

export default class App extends Component {

    static configureScene(route) {
        return route.animationType || Navigator.SceneConfigs.FloatFromRight
    }

    static renderScene(route, navigator) {
        return (
            <Container>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
                <View style={{ backgroundColor: COLOR.green500, height: 24 }} />
                <route.Page
                    route={route}
                    navigator={navigator}
                />
            </Container>
        )
    }

    componentWillMount() {
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true)        
    }

    render() {
        return (
            <ThemeProvider uiTheme={uiTheme}>
                <Navigator
                    configureScene={App.configureScene}
                    initialRoute={routes.home}
                    renderScene={App.renderScene}
                    ref={this.onNavigatorRef}
                />
            </ThemeProvider>
        )
    }
}

