import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Avatar from 'material-ui/Avatar'

class AvatarButton extends React.Component {
	
	render() {
		const {size, type="small", border="", label, user} = this.props
		this.src = (this.props.src) ? this.props.src : "/images/avatar.jpg"
	  	let style={
	  		avatarButton: {
	  			marginRight: this.props.marginRight || 0,
			    textAlign: "center",
			    float: "left",
			    width: (type==="large") ? 100 : "inherit"
			},
			label: {
				color: "#0592e0"
			}
	  	}
		return(
		<div style={style.avatarButton}>
		  	{(type==="large") ?
		  	  		<Avatar size={size || 80} className={" avatar large "+border}
		  									src={this.src} />
		  	  	               :
		  	  		<Avatar size={size || 40} className={"avatar "+border} 
		  	  	            src={this.src} />
		  	}
		  	{label &&
		  		<div className="label" style={style.label}>{label}</div>
		  	}
	  	</div>
		)
  	}
}

export default AvatarButton