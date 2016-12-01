import React from 'react'

import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
} from 'react-native'

export default class NoteList extends React.Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
  }

  _onPress(rowData) {
    console.log(rowData)
    this.props.navigator.push({
      name: 'createNote',
      note: rowData,
    })
  }

  render(){
    return (
      <ListView
        dataSource={
          this.ds.cloneWithRows([
            {title:"Note 1", body:"Body 1", id:1},
            {title:"Note 2", body:"Body 2", id:2},
          ])
        }

        renderRow={rowData =>(
          <TouchableHighlight onPress={this._onPress.bind(this, rowData)}>
            <Text>{rowData.title}</Text>
          </TouchableHighlight>
        )}
      />
    )
  }
}