import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, getFormValues } from 'redux-form';
import { getLedetekst } from 'digisyfo-npm';
import { connect } from 'react-redux';
import TekstfeltMedEnhet from '../../skjema/TekstfeltMedEnhet';
import { lagDesimaltall, getObjectValueByString } from '../../../utils';
import { tilDatePeriode } from '../../../utils/periodeUtils';
import DetteTilsvarer, { getStillingsprosent } from './DetteTilsvarer';
import { soknadperiode, fieldPropTypes } from '../../../propTypes';
import { SYKEPENGER_SKJEMANAVN } from '../setup';

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
        const { input, autofill, untouch, arbeidsgiver, periode, ferieOgPermisjonPerioder, aktiviteter, aktivitetIndex } = this.props;

        const avvik = aktiviteter[aktivitetIndex].avvik;
        const timer = avvik.timer.input.value;
        const arbeidstimerNormalUke = avvik.arbeidstimerNormalUke.input.value;
        const stillingsprosent = getStillingsprosent(timer, arbeidstimerNormalUke, periode, ferieOgPermisjonPerioder);
        const visTilsvarendeIProsent = timer !== '' && stillingsprosent !== undefined;

        const enheter = [{
            value: 'prosent',
        }, {
            value: 'timer',
        }];

        const lagreStillingsprosent = () => {
            if (this.getValgtEnhet() === 'timer' && visTilsvarendeIProsent) {
                autofill(this.props.names[4], stillingsprosent);
            }
        };

        return (<div>
            <div className="skjema__input blokk">
                <label htmlFor={`aktivitet-${this.props.aktivitetIndex}-normal`} className="skjema__sporsmal">{getLedetekst('sykepengesoknad.angi-tid.normal-arbeidstimer.sporsmal')}</label>
                <Field
                    onBlur={lagreStillingsprosent}
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
            <Field
                onBlur={lagreStillingsprosent}
                id={this.getAntallName()}
                component={TekstfeltMedEnhet}
                parse={lagDesimaltall}
                label={this.getEnhetLabel()}
                name={this.getAntallName()} />
            { visTilsvarendeIProsent && <DetteTilsvarer stillingsprosent={stillingsprosent} /> }
        </div>);
    }
}

AngiTid.propTypes = {
    aktivitetIndex: PropTypes.number,
    input: fieldPropTypes.input,
    names: PropTypes.arrayOf(PropTypes.string),
    autofill: PropTypes.func,
    untouch: PropTypes.func,
    arbeidsgiver: PropTypes.string,
    periode: soknadperiode,
    ferieOgPermisjonPerioder: PropTypes.arrayOf(soknadperiode),
    aktiviteter: PropTypes.arrayOf(PropTypes.shape({
        avvik: PropTypes.shape(fieldPropTypes),
        arbeidsgrad: PropTypes.shape(fieldPropTypes),
        beregnetArbeidsgrad: PropTypes.shape(fieldPropTypes),
        enhet: PropTypes.shape(fieldPropTypes),
        timer: PropTypes.shape(fieldPropTypes),
    })),
};

const mapStateToProps = (state) => {
    const values = getFormValues(SYKEPENGER_SKJEMANAVN)(state);
    let ferieOgPermisjonPerioder = [];
    if (values.harHattFeriePermisjonEllerUtenlandsopphold) {
        if (values.harHattFerie) {
            ferieOgPermisjonPerioder = [...ferieOgPermisjonPerioder, ...values.ferie];
        }
        if (values.harHattPermisjon) {
            ferieOgPermisjonPerioder = [...ferieOgPermisjonPerioder, ...values.permisjon];
        }
    }
    return {
        ferieOgPermisjonPerioder: ferieOgPermisjonPerioder.map(tilDatePeriode),
    };
}

export default connect(mapStateToProps)(AngiTid);
