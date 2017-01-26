import React, { PropTypes, Component } from 'react';
import { Field } from 'redux-form';
import Radioknapper from '../../skjema/Radioknapper';
import TekstfeltMedEnhet from '../../skjema/TekstfeltMedEnhet';
import { lagDesimaltall } from '../../../utils';

class AngiTid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valgtEnhet: 'prosent'
        };
    }

    componentDidMount() {
        this.setEnhet('prosent');
    }

    setEnhet(enhet) {
        const { autofill } = this.props;
        autofill(this.getEnhetName(), enhet);
    }

    getValgtEnhet() {
        return this.state.valgtEnhet;
    }

    getEnhetLabel() {
        return this.getValgtEnhet() === 'timer' ? 'timer totalt per uke' : 'prosent totalt per uke';
    }

    getNormalSporsmal() {
        return 'Hvor mange timer jobber du normalt per uke?';
    }

    getAntallName() {
        if (this.getValgtEnhet() === 'prosent') {
            return this.props.names[0];
        }
        return this.props.names[1];
    }

    getEnhetName() {
        return this.props.names[3];
    }

    getAntallId() {
        return `angiTid-${this.props.aktivitetIndex}`;
    }

    render() {
        const { input, autofill, untouch } = this.props;
        const enheter = [{
            value: 'prosent',
            label: 'i prosent',
        }, {
            value: 'timer',
            label: 'i timer',
        }];

        return (<div>
            <div className="inputgruppe inputgruppe--horisontal">
                {
                    enheter.map((enhet, index) => {
                        const name = `enhet_${this.props.aktivitetIndex}`;
                        const id = `${name}_${index}`;
                        return (<div className="skjema__input" key={index}>
                            <input
                                onChange={() => {
                                    autofill(this.getAntallName(), null);
                                    untouch(this.getAntallName());
                                    this.setState({
                                        valgtEnhet: enhet.value,
                                    });
                                    this.setEnhet(enhet.value);
                                }}
                                type="radio"
                                className="radioknapp"
                                value={enhet.value}
                                name={name}
                                id={id}
                                checked={enhet.value === this.state.valgtEnhet}
                                aria-controls={this.getAntallId()} />
                            <label htmlFor={id}>{enhet.label}</label>
                        </div>)
                    })
                }
            </div>
            <div className="blokk">
                <Field id={this.getAntallId()} component={TekstfeltMedEnhet} parse={lagDesimaltall} label={this.getEnhetLabel()} name={this.getAntallName()} />
            </div>
            <div className="skjema__input">
                <label htmlFor={`aktivitet-${this.props.aktivitetIndex}-normal`} className="skjema__sporsmal">{this.getNormalSporsmal()}</label>
                <Field name={this.props.names[2]} id={`aktivitet-${this.props.aktivitetIndex}-normal`} component={TekstfeltMedEnhet} parse={lagDesimaltall} label="timer per uke" />
            </div>
        </div>);
    }
}

AngiTid.propTypes = {
    aktivitetIndex: PropTypes.number,
    input: PropTypes.object,
    names: PropTypes.array,
};

export default AngiTid;
