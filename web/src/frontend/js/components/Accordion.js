import React, { PropTypes, Component } from "react";

class Accordion extends Component {

	render () {
		return <div className="accordion">{this.props.children}</div>
	};

}

export default Accordion;