import React, { Component } from 'react'
import { AutoComplete } from 'material-ui'

class GooglePlaceAutocomplete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      data: []
    }
  }

  componentDidMount() {
    this.setState({
      autocompleteService: new google.maps.places.AutocompleteService()
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.searchText !== nextProps.searchText) {
      this.onUpdateInput(nextProps.searchText, this.state.dataSource)
      this.onInputChange(nextProps.searchText)
    }
  }

  updateDatasource(data) {
    if(!data || !data.length) {
      return false
    }

    this.setState({
      dataSource: data.map(place => place.description),
      data
    })
  }

  onUpdateInput(searchText, dataSource) {
    if (!searchText.length || !this.state.autocompleteService) {
      return false
    }

    this.state.autocompleteService.getPlacePredictions({
      input: searchText,
      location: this.props.location || new google.maps.LatLng(0, 0),
      radius: this.props.radius || 0
    }, data => this.updateDatasource(data))
  }

  onNewRequest(searchText, index) {
    // The index in dataSource of the list item selected, or -1 if enter is pressed in the TextField
    if(index === -1) {
      return false
    }

    this.props.onNewRequest(this.state.data[index], searchText, index)
  }

  onInputChange(searchText) {
    this.props.onChange({target: {value: searchText}})
  }

  render() {
    return (
      <AutoComplete {...this.props}
                    ref={this.props.getRef}
                    filter={AutoComplete.noFilter}
                    onUpdateInput={this.onInputChange.bind(this)}
                    dataSource={this.state.dataSource}
                    onNewRequest={this.onNewRequest.bind(this)}/>
    )
  }
}

GooglePlaceAutocomplete.propTypes = {
  location: React.PropTypes.object,
  radius: React.PropTypes.number,
  onNewRequest: React.PropTypes.func,
  getRef: React.PropTypes.func
}

export default GooglePlaceAutocomplete