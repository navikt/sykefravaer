import React, { PropTypes, Component } from 'react';
import Brodsmuler from "../components/Brodsmuler.js"

class Side extends Component {
	render() {
		console.log(this.props)
		return <div className="begrensning blokk-xl">
				{this.props.children}
			</div>
	}
}

export default Side; 