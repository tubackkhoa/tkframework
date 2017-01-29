import Home from './containers/Home'
import MapPage from './containers/Map'

// we can use animationType object for each route via Navigator.SceneConfigs
export default {
    home: {
        title: 'Select component',
        Page: Home,
    },    
    map: {
        title: 'Map',
        Page: MapPage,        
    },
    
}
