import React, { PropTypes } from 'react'

import Snackbar from 'material-ui/Snackbar'

class Toast extends React.Component {

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  handleRequestClose() {
    this.props.clearToast(this.props.id)
  }

  render() {
    const { id, message, level, duration } = this.props         
    return (   
      <Snackbar
        key={id} className={level}
        open={true}
        message={message}        
        autoHideDuration={duration}
        onRequestClose={this.handleRequestClose.bind(this)}
      />  
    )
  }
}

Toast.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  level: PropTypes.oneOf([ 'info', 'warn', 'error', 'success' ]).isRequired,
}

export default Toast