import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { actions } from '../../store/actions/counter'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'

const style = {
  margin: 12,
}

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) => {  
  return (
  <div>
    <RaisedButton onClick={onIncrement} label="Increment" style={style} />
    <RaisedButton onClick={onDecrement} label="Decrement" style={style} />    
    <RaisedButton onClick={onIncrementAsync} primary={true}
      label="Increment after 1 second" style={style} />    
    <Divider />
    <div style={style} >
      Clicked: {value} time{value > 1 ? 's' : ''}
    </div>
  </div>
)
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrementAsync: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  value: state.counter
})

export default connect(mapStateToProps, actions)(Counter)
