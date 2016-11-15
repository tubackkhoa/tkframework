import React, { PropTypes } from 'react'
import {red500} from 'material-ui/styles/colors'

function ErrorMessage({ message }) {
  return (
    <div>
      <p style={{color:red500}}>{message}</p>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ErrorMessage

