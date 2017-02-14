import React, { PropTypes, Component } from 'react';
import { Field } from 'redux-form';
import TekstfeltMedEnhet from '../../skjema/TekstfeltMedEnhet';
import { lagDesimaltall } from '../../../utils';
import { getLedetekst } from 'digisyfo-npm';

class AngiTid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valgtEnhet: 'prosent',
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
        return getLedetekst(`sykepengesoknad.angi-tid.antall.label.${this.getValgtEnhet()}`, this.props.ledetekster);
    }

    getNormalSporsmal() {
        return getLedetekst('sykepengesoknad.angi-tid.normal-arbeidstimer.sporsmal', this.props.ledetekster);
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
        const { input, autofill, untouch, ledetekster } = this.props;
        const enheter = [{
            value: 'prosent',
        }, {
            value: 'timer',
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
                            <label htmlFor={id}>{getLedetekst(`sykepengesoknad.angi-tid.velg-enhet.label.${enhet.value}`, ledetekster)}</label>
                        </div>);
                    })
                }
            </div>
            <div className="blokk">
                <Field id={this.getAntallId()} component={TekstfeltMedEnhet} parse={lagDesimaltall} label={this.getEnhetLabel()} name={this.getAntallName()} />
            </div>
            <div className="skjema__input">
                <label htmlFor={`aktivitet-${this.props.aktivitetIndex}-normal`} className="skjema__sporsmal">{this.getNormalSporsmal()}</label>
                <Field
                    name={this.props.names[2]}
                    id={`aktivitet-${this.props.aktivitetIndex}-normal`}
                    component={TekstfeltMedEnhet}
                    parse={lagDesimaltall}
                    label={getLedetekst('sykepengesoknad.angi-tid.normal-arbeidstimer.label', ledetekster)} />
            </div>
        </div>);
    }
}

AngiTid.propTypes = {
    aktivitetIndex: PropTypes.number,
    input: PropTypes.object,
    names: PropTypes.array,
    autofill: PropTypes.func,
    untouch: PropTypes.func,
    ledetekster: PropTypes.object,
};

export default AngiTid;
