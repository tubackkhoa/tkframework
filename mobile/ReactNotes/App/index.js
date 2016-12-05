import React from 'react'
import {
  StyleSheet,
  Text,
  Navigator,
  View,  
} from 'react-native'

import SimpleButton from './Components/SimpleButton'
import NoteScreen from './Components/NoteScreen'
import HomeScreen from './Components/HomeScreen'

var NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (
          <SimpleButton
            onPress={()=>navigator.push({name:'noteLocations'})}
            customText='Map'
            style={styles.navBarLeftButton}
            textStyle={styles.navBarButtonText}
          />
        )
      case 'createNote':
      case 'noteLocations':
      case 'camera':
        return (
          <SimpleButton
            onPress={() => navigator.pop()}
            customText='Back'
            style={styles.navBarLeftButton}
            textStyle={styles.navBarButtonText}
           />
        );
      default:
        return null;
    }
  },

  RightButton: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (
          <SimpleButton
            onPress={() => {
              navigator.push({
                name: 'createNote'
              });
            }}
            customText='Create Note'
            style={styles.navBarRightButton}
            textStyle={styles.navBarButtonText}
          />
        );
      default:
         return null;
    }
  },

  Title: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (
          <Text style={styles.navBarTitleText}>React Notes</Text>
        );
      case 'createNote':
        return (
          <Text style={styles.navBarTitleText}>{route.note ? route.note.title : 'Create Note'}</Text>          
        )
      case 'camera':
        return (
          <Text style={styles.navBarTitleText}>Take Picture</Text>
        )
    }
  }
};

class ReactNotes extends React.Component {
  constructor (props) {
    super(props);
  }

  saveNoteImage(imagePath, note){
    note.imagePath = imagePath
    this.updateNote(note)
  }

  updateNote(note) {
    var newNotes = Object.assign({}, this.state.notes);

    if (!note.isSaved) {
      note.location = this.state.lastPosition;
    }

    note.isSaved = true;
    newNotes[note.id] = note;
    this.setState({notes:newNotes});
    this.saveNotes(newNotes);
  }

  renderScene (route, navigator) {
    switch (route.name) {
      case 'home':
        return (
          <HomeScreen navigator={navigator}/>
        );
      case 'createNote':
        return (
          <NoteScreen navigator={navigator} note={route.note}
            onChangeNote={note=>this.updateNote(note)}
            showCameraButton={true}/>
        );
      case 'camera':
        return (
          <CameraScreen onPicture={imagePath=>this.saveNoteImage(imagePath, route.note)}/>
        )
    }
  }

  render () {
    return (
      <Navigator
        initialRoute={{name: 'home'}}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
      />
    );
  }
}

var styles = StyleSheet.create({
    navBar: {
      backgroundColor: '#5B29C1',
      borderBottomColor: '#48209A',
      borderBottomWidth: 1
    },
    navBarTitleText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
      marginVertical: 9
    },
    navBarLeftButton: {
      paddingLeft: 10
    },
    navBarRightButton: {
      paddingRight: 10
    },
    navBarButtonText: {
      color: '#EEE',
      fontSize: 16,
      marginVertical: 10
    }
});

export default ReactNotes