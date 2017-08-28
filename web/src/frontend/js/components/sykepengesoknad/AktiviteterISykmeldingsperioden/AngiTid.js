import React, { PropTypes, Component } from 'react';
import { Field } from 'redux-form';
import TekstfeltMedEnhet from '../../skjema/TekstfeltMedEnhet';
import { lagDesimaltall, getObjectValueByString } from '../../../utils';
import { getLedetekst } from 'digisyfo-npm';
import DetteTilsvarer, { getStillingsprosent } from './DetteTilsvarer';
import { soknadperiode, soknadaktiviteter } from '../../../propTypes';

class AngiTid extends Component {
    constructor(props) {
        super(props);
        let valgtEnhet = 'prosent';
        try {
            const timerName = this.props.names[1];
            const timer = getObjectValueByString(this.props, timerName).input.value;
            if (timer && timer !== '') {
                valgtEnhet = 'timer';
            }
        } catch (e) {
            valgtEnhet = 'prosent';
        }

        this.state = {
            valgtEnhet,
        };
    }

    componentDidMount() {
        this.setEnhet(this.getValgtEnhet());
    }

    setEnhet(enhet) {
        const { autofill } = this.props;
        autofill(this.getEnhetName(), enhet);
    }

    getValgtEnhet() {
        return this.state.valgtEnhet;
    }

    getEnhetLabel() {
        return getLedetekst(`sykepengesoknad.angi-tid.antall.label-totalt.${this.getValgtEnhet()}`);
    }

    getNormalSporsmal() {
        return getLedetekst('sykepengesoknad.angi-tid.normal-arbeidstimer.sporsmal');
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
        const { input, autofill, untouch, arbeidsgiver, periode, aktiviteter, aktivitetIndex } = this.props;

        const avvik = aktiviteter[aktivitetIndex].avvik;
        const timer = avvik.timer.input.value;
        const arbeidstimerNormalUke = avvik.arbeidstimerNormalUke.input.value;
        const stillingsprosent = getStillingsprosent(timer, arbeidstimerNormalUke, periode);
        const visTilsvarendeIProsent = timer !== '' && stillingsprosent !== undefined;

        const enheter = [{
            value: 'prosent',
        }, {
            value: 'timer',
        }];

        return (<div>
            <div className="skjema__input blokk">
                <label htmlFor={`aktivitet-${this.props.aktivitetIndex}-normal`} className="skjema__sporsmal">{this.getNormalSporsmal()}</label>
                <Field
                    name={this.props.names[2]}
                    id={this.props.names[2]}
                    component={TekstfeltMedEnhet}
                    parse={lagDesimaltall}
                    label={getLedetekst('sykepengesoknad.angi-tid.normal-arbeidstimer.label')} />
            </div>
            <h4 className="skjema__sporsmal">
                {
                    getLedetekst('sykepengesoknad.aktiviteter.avvik.hvor-mye-har-du-jobbet-totalt', {
                        '%ARBEIDSGIVER%': arbeidsgiver,
                    })
                }
            </h4>
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
                                aria-controls={this.getAntallName()} />
                            <label htmlFor={id}>{getLedetekst(`sykepengesoknad.angi-tid.velg-enhet.label.${enhet.value}`)}</label>
                        </div>);
                    })
                }
            </div>
            <Field onBlur={() => {
                if (this.getValgtEnhet() === 'timer' && visTilsvarendeIProsent) {
                    autofill(this.props.names[4], stillingsprosent);
                }
            }} id={this.getAntallName()} component={TekstfeltMedEnhet} parse={lagDesimaltall} label={this.getEnhetLabel()} name={this.getAntallName()} />
            { visTilsvarendeIProsent && <DetteTilsvarer stillingsprosent={stillingsprosent} /> }
        </div>);
    }
}

AngiTid.propTypes = {
    aktivitetIndex: PropTypes.number,
    input: PropTypes.object,
    names: PropTypes.array,
    autofill: PropTypes.func,
    untouch: PropTypes.func,
    arbeidsgiver: PropTypes.string,
    periode: soknadperiode,
    aktiviteter: soknadaktiviteter,
};

export default AngiTid;
