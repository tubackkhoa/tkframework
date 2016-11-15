import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Toast from './toast'
// for convenient, we can just import one
import * as actionCreators from 'store/actions/common'
import * as commonSelectors from 'store/selectors/common'

const Toasts = ({ toast, clearToast }) => (
  <div className="toasts">
    {toast &&
      <Toast
        {...toast}
        key={toast.id}
        clearToast={clearToast}
        />
    }
  </div>
)

Toasts.propTypes = {
  toast: PropTypes.shape(Toast.propTypes),
  clearToast: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  toast: commonSelectors.getToast(state),
})

export default connect(mapStateToProps, actionCreators)(Toasts)
