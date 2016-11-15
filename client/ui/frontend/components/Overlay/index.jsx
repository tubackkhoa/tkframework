import React from 'react'

const styles = {
	Dialog: {
    title: {
      color: "rgb(94, 163, 255)",
      fontSize: 36,
      textAlign: "center",
      fontWeight: 300
    }
  }
}

class Overlay extends React.Component {
	render(){
		return(
			<div className="overlay">
		    <div className="overlay-content">
		      <div className="Dialog-title" style={styles.Dialog.title}>{this.props.title}</div>
		      <div dangerouslySetInnerHTML={{__html: this.props.text}}/>
		    </div>
		  </div>
		)
	}
}

export default Overlay