import React, { PropTypes, Component } from 'react';

const Radioknapp = ({ name, value, onChange, id, label, children }) => {
	return (<div>
				<div className="nav-input">
					<input name={name} type="radio"
						value={value}
						onChange={onChange}
						className="nav-radioknapp"
						id={'radio-' + id} />
					<label htmlFor={'radio-' + id}>
						{label}
					</label>
			</div>
			{this.props.valgtVerdi === this.props.value && this.props.children ? <div className="panel panel-ekstra">{children}</div> : ''}
			</div>);
};

Radioknapp.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.function,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	children: PropTypes.object,
};

export class Radiogruppe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			valgtVerdi: null,
		};
	}

	onChange(val) {
		this.setState({
			valgtVerdi: val,
		});
		if (typeof this.props.onChange === 'function') {
			this.props.onChange(val);
		}
	}

	render() {
		return (<div className={this.props.erFeil ? 'skjema-feilomrade feil' : 'skjema-feilomrade'}>
			<this.props.sporsmalTag className="skjema-sporsmal">{this.props.sporsmal}</this.props.sporsmalTag>
			{this.props.children.map((knapp, index) => {
				return (<Radioknapp valgtVerdi={this.state.valgtVerdi}
					onChange={() => { this.onChange(knapp.props.value); }}
					name={this.props.name}
					key={index}
					id={'radio-' + knapp.props.name + '-' + index}
					{...knapp.props} />);
			})}
			<span className="skjema-feilmelding" role="alert" aria-live="polite">{this.props.feilmelding}</span>
		</div>);
	}
}

Radiogruppe.propTypes = {
	onChange: PropTypes.function,
	value: PropTypes.string.isRequired,
	sporsmal: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	erFeil: PropTypes.bool,
	children: PropTypes.object,
	feilmelding: PropTypes.string,
};

Radiogruppe.defaultProps = {
	sporsmalTag: 'h3',
	feilmelding: 'Vennligst velg et alternativ',
};

export const Checkbox = ({ name, value, onChange, id, isChecked, children, valgtVerdi, label }) => {
	return (<div>
			<div className="nav-input">
				<input 	name={name} type="checkbox"
					value={value}
					onChange={onChange}
					className="nav-checkbox"
					id={'radio-' + id}
					checked={isChecked} />
				<label htmlFor={'radio-' + id}>
					{label}
				</label>
			</div>
			{valgtVerdi === value && children ? <div className="panel panel-ekstra">{children}</div> : ''}
			</div>);
};

Checkbox.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.function,
	id: PropTypes.string.isRequired,
	isChecked: PropTypes.bool,
	children: PropTypes.object,
	valgtVerdi: PropTypes.string,
	label: PropTypes.string.isRequired,
};
