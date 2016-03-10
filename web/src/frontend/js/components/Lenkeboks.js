import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class Lenkeboks extends Component {
	render() {
		return <li className="lenkeboks">
			<Link to={this.props.path}>
				<h2 className="hode hode-undertittel hode-dekorert">{this.props.title}</h2>
				<p className="typo-normal">{this.props.text}</p>
			</Link>
		</li>
	}
}

export default Lenkeboks;