import React, { PropTypes, Component } from 'react';
import { scrollTo } from "../utils";

export class Utvidbar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			erApen: this.props.erApen
		}
	};

	toggle(e) {
		e.preventDefault(); 
		let el = this.refs.utvidbar;
		this.setState({
			erApen: !this.state.erApen
		}, function () {
			if(this.state.erApen) {
				setTimeout(function() {
					scrollTo(el, 600)
				}, 150);
			}
		});
	};

	render() {
		return <div ref="utvidbar" className="utvidbar blokk-l" aria-expanded={this.state.erApen}>
					<h3 className={!this.state.erApen ? "utvidbar-tittel" : "utvidbar-tittel utvidbar-tittel--apen"}>
						<a href="javscript:void(0)" aria-pressed={this.state.erApen} onClick={(event) => {this.toggle(event)}}>
							<span>{this.props.tittel}</span>
						</a>
					</h3>
					<div className={!this.state.erApen ? "utvidbar-innhold-beholder utvidbar-innhold-beholder--lukket" : "utvidbar-innhold-beholder"}>
						<div className="utvidbar-innhold">
							{this.props.children}
							<div className="knapperad">
								<a className="lenke-fremhevet" role="button" href="#" aria-pressed={!this.state.erApen} tabIndex={this.state.erApen ? "" : "-1"} onClick={(event) => {this.toggle(event)}}>Lukk</a>
							</div>
						</div>
					</div>
				</div>
	}
}

Utvidbar.propTypes = {
	erApen: PropTypes.bool.isRequired
}

Utvidbar.defaultProps = {
	erApen: false
}

export default Utvidbar;