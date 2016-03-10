import React, { PropTypes, Component } from 'react';

export class Radioknapp extends Component {

	render() {
		return <div><div className="nav-input">
			    <input 	name={this.props.name} type="radio" 
			    		value={this.props.value} 
			    		onChange={this.props.onChange} 
			    		className="nav-radioknapp" 
			    		id={"radio-" + this.props.id} />
			    <label htmlFor={"radio-" + this.props.id}>
			        {this.props.label}
			    </label>
			</div>
			{this.props.valgtVerdi === this.props.value && this.props.children ? <div className="panel panel-ekstra">{this.props.children}</div> : ""}
			</div>

	}
}

export class Radiogruppe extends Component {	

	onChange(val) {
		this.setState({
			valgtVerdi: val
		});
		if (typeof this.props.onChange === "function") {
			this.props.onChange(val);
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			valgtVerdi: null
		}
	};

	render() {
		return <div className={this.props.erFeil ? "skjema-feilomrade feil" : "skjema-feilomrade"}>
			<this.props.sporsmalTag className="skjema-sporsmal">{this.props.sporsmal}</this.props.sporsmalTag>
			{this.props.children.map((knapp, index) => {
				return <Radioknapp valgtVerdi={this.state.valgtVerdi} onChange={() => { this.onChange(knapp.props.value) }} name={this.props.name} key={index} id={"radio-" + knapp.props.name + "-" + index} {...knapp.props} />
			})}
			<span className="skjema-feilmelding" role="alert" aria-live="polite">{this.props.feilmelding}</span>
		</div>
	}
}

Radiogruppe.defaultProps = {
	sporsmalTag: "h3",
	feilmelding: "Vennligst velg et alternativ"
}

export class Checkbox extends Component {

	render() {
		return <div><div className="nav-input">
			    <input 	name={this.props.name} type="checkbox" 
			    		value={this.props.value} 
			    		onChange={this.props.onChange} 
			    		className="nav-checkbox" 
			    		id={"radio-" + this.props.id} 
			    		checked={this.props.checked} />
			    <label htmlFor={"radio-" + this.props.id}>
			        {this.props.label}
			    </label>
			</div>
			{this.props.valgtVerdi === this.props.value && this.props.children ? <div className="panel panel-ekstra">{this.props.children}</div> : ""}
			</div>

	}
}