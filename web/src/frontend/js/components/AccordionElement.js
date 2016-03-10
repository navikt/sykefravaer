import React, { PropTypes, Component } from "react";

class AccordionElement extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.isOpen
		}
	};

	toggle(e) {
		e.preventDefault(); 
		this.setState({
			isOpen: !this.state.isOpen
		});
	};

	render () {
		return (<section id={this.props.id} className={this.state.isOpen ? "accordion-group open" : "accordion-group"}>
					<h2 className="accordion-header">
						<a role="button" className="accordion-toggle accordion-header tittel-dekorert" 
							onClick={this.toggle} 
							aria-pressed={this.state.isOpen} 
							href={"#" + this.props.id + "-body"}>
							<span className="accordion-label">{this.props.title}</span> 
							<span className="accordion-flipp"></span>
						</a>
					</h2>
					<div className={this.state.isOpen ? "accordion-body clearfix collapse in" : "accordion-body clearfix collapse"} 
						style={{height: this.state.isOpen ? "300px" : 0}}
						id={this.props.id + "-body"}>
						<div className="accordion-inner">
							<div className="panel panel-stablet">
								<div className="begrensning side-innhold"> 
									{this.props.children}
								</div>
							</div>
						</div>
					</div>
				</section>)
	};

}

AccordionElement.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired
}

export default AccordionElement;