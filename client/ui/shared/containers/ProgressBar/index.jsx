import React, { Component } from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import inlineStyles from 'ui/shared/styles/MaterialUI/index'

export default function (ComposedComponent) {
  class ProgressBar extends Component {
    constructor(props) {
      super(props)
      this.state = { loading: true }
    }

    renderProgressBar() {
      if (this.state.loading) {
        return (
          <LinearProgress
            mode="indeterminate"
            min={70}
            max={75}
            color={inlineStyles.progressColor}
            style={inlineStyles.progressBar}
          />
        )
      }
    }


    render() {
      return (
        <div>
          {this.renderProgressBar()}
          <ComposedComponent
            {...this.props}
            finishLoading={() => this.setState({ loading: false })}
          />
        </div>
      )
    }
  }

  return ProgressBar
}

